// After `vite build`: writes SHA256SUMS.txt (to verify what is on the server)
// and packs dist/ into release/markdown-preview-editor-site.zip for upload.
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { zipSync } from 'fflate';
import { spawnSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const release = join(root, 'release');

if (!existsSync(join(dist, '.htaccess'))) {
  throw new Error('dist/.htaccess is missing — the build did not copy public/.htaccess');
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const files = walk(dist)
  .map((f) => relative(dist, f).replace(/\\/g, '/'))
  .filter((f) => f !== 'SHA256SUMS.txt')
  .sort();

const sums = files
  .map((f) => `${createHash('sha256').update(readFileSync(join(dist, f))).digest('hex')}  ${f}`)
  .join('\n');
writeFileSync(join(dist, 'SHA256SUMS.txt'), `${sums}\n`);

const entries = {};
for (const f of [...files, 'SHA256SUMS.txt']) entries[f] = readFileSync(join(dist, f));
mkdirSync(release, { recursive: true });
const zipPath = join(release, 'markdown-preview-editor-site.zip');
writeFileSync(zipPath, zipSync(entries, { level: 9 }));

const size = (statSync(zipPath).size / 1024 / 1024).toFixed(2);
console.log(`package: ${files.length} files, SHA256SUMS.txt written, ${relative(root, zipPath)} (${size} MB)`);

// Some hosting virus scanners (ClamAV + Sanesecurity "Foxhole" rules) reject any
// zip/rar that contains .js files. A .tar.gz passes and cPanel can extract it too.
const tarName = 'release/markdown-preview-editor-site.tar.gz';
const tar = spawnSync('tar', ['-czf', tarName, '-C', 'dist', '.'], { cwd: root, stdio: 'inherit' });
if (tar.status === 0) console.log(`package: ${tarName} (${(statSync(join(root, tarName)).size / 1024 / 1024).toFixed(2)} MB)`);
else console.warn('package: tar is not available, skipped .tar.gz');
