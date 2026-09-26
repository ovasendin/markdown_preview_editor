// English is the source language and the fallback for every other locale.
// Placeholders in {braces} must be kept in translations.
const en = {
  'app.framed': 'This site cannot be opened inside another page.',

  // Header
  'header.viewMode': 'View mode',
  'view.editor': 'Editor',
  'view.split': 'Split',
  'view.preview': 'Preview',
  'theme.toggle': 'Toggle theme',
  'theme.light': 'Light theme',
  'theme.dark': 'Dark theme',
  'settings.title': 'Settings',
  'file.open': 'Open',
  'file.openTitle': 'Open files (Ctrl+O)',
  'file.folder': 'Folder',
  'file.folderTitle': 'Open a folder with documents and images',
  'file.save': 'Save',
  'file.saveTitle': 'Save .md (Ctrl+S)',
  'file.html': 'HTML',
  'file.htmlTitle': 'Export to a self-contained HTML file',
  'file.print': 'Print',
  'file.printTitle': 'Print or save as PDF',
  'menu.title': 'Menu',
  'menu.folder': 'Open folder',
  'menu.save': 'Save as .md',
  'menu.html': 'Export to HTML',
  'menu.print': 'Print / save as PDF',

  // Layout
  'pane.editor': 'Editor',
  'pane.preview': 'Preview',
  'pane.resize': 'Resize panes',
  'toolbar.formatting': 'Formatting',
  'drop.title': 'Drop to open',
  'drop.hint1': '.md, .txt, images, audio, video or a whole folder.',
  'drop.hint2': 'Files are read only in your browser and are never uploaded.',
  'drop.wrongPlace': 'Drop files onto the editor (left side of the window)',

  // Protection panel
  'prot.panel': 'Protection',
  'prot.full': 'Full protection',
  'prot.fullDesc': 'The document cannot access the network: external links are inactive; external images, audio and video are not loaded.',
  'prot.permissions': 'Permissions',
  'prot.links': 'Allow links',
  'prot.linksDesc': "Open in a new tab without revealing this page's address. Suspicious ones only after confirmation.",
  'prot.images': 'Allow external images',
  'prot.imagesDesc': 'The image server will see your IP address and when you opened the document.',
  'prot.media': 'Allow external audio & video',
  'prot.mediaDesc': 'Standard player controls, never autoplay.',
  'prot.checkTitle': 'Lightweight threat check.',
  'prot.checkText': 'Links and media are also checked with heuristics: phishing tricks, look-alike domains, executables, local network addresses. Dangerous items are always blocked. This is not an antivirus.',
  'prot.localNote': 'Images and media dropped together with a document are always shown — they need no network. Permissions reset when the page is reloaded.',
  'prot.relaxed': 'Protection relaxed',
  'prot.fullTooltip': 'Full protection: the document cannot access the network',
  'prot.allowed': 'Allowed: {list}',
  'prot.listLinks': 'links',
  'prot.listImages': 'images',
  'prot.listMedia': 'audio & video',
  'prot.enableHint': 'To relax protection, enable one of the permissions below',

  // Settings panel
  'settings.language': 'Language',
  'settings.languageAuto': 'Browser language',
  'settings.sync': 'Synchronized scrolling',
  'settings.remember': 'Remember documents in this browser',
  'settings.rememberOn': 'On: the text of open documents is stored in this browser (without images). Turn it off on shared computers.',
  'settings.rememberOff': 'Off: closing the browser tab erases everything. Turn it on only on your personal computer.',
  'settings.clear': 'Clear everything',
  'settings.clearNote': 'Closes all documents and removes them from memory and browser storage.',
  'settings.privacy': 'All documents are processed only in your browser. The site has no analytics and never contacts third-party servers.',

  // Tabs and dialogs
  'tab.untitled': 'Untitled {n}.md',
  'tab.close': 'Close',
  'tab.closeNamed': 'Close {name}',
  'tab.new': 'New document',
  'dialog.cancel': 'Cancel',
  'dialog.close': 'Close',
  'close.title': 'Close without saving?',
  'close.body': '"{name}" has unsaved changes. They will be lost.',
  'clear.title': 'Clear everything?',
  'clear.body': 'All open documents will be closed and removed from memory and from browser storage. Unsaved changes will be lost.',
  'clear.ok': 'Clear',
  'clear.done': 'Everything cleared',

  // Status bar
  'status.counts': 'Words: {words} · Characters: {chars} · Lines: {lines} · ~{minutes} min read',
  'status.blocked': 'Blocked by protection: {n}',
  'status.dangers': 'Dangerous: {n}',
  'status.warnings': 'Suspicious: {n}',
  'status.missing': 'Missing files: {n}',
  'status.details': 'Show details',
  'status.private': 'Only in your browser',
  'status.privateTitle': 'Documents never leave your browser: the site has no server to receive them, and network requests are forbidden by its security policy.',

  // Issues dialog
  'issues.title': 'External resources and threat check',
  'issues.danger': 'Dangerous — blocked',
  'issues.warn': 'Suspicious',
  'issues.blocked': 'Blocked by protection mode',
  'issues.missing': 'Local file not found',
  'issues.unsupported': 'Not supported',
  'issues.note': 'This is a lightweight check: heuristics that run inside the browser, without sending addresses to any online service. It is not an antivirus.',

  // Suspicious link dialog
  'link.title': 'Suspicious link',
  'link.found': 'The lightweight check found warning signs:',
  'link.address': 'Address:',
  'link.note': 'This is a heuristic, not an antivirus. Open it only if you trust the source.',
  'link.open': 'Open anyway',

  // Files
  'files.opened': 'Documents opened: {n}',
  'files.media': 'media files: {n}',
  'files.skipped': 'skipped: {n} ({names})',
  'files.readError': 'Could not read the files: {error}',
  'files.tooLarge': 'File "{name}" is too large (over 20 MB)',
  'files.notText': 'File "{name}" does not look like a text file',
  'save.done': "Saved: {name} (to your browser's downloads folder)",
  'export.done': 'Exported: {name}',
  'render.error': 'Rendering error: {error}',

  // Editor
  'editor.placeholder': 'Start writing Markdown or drop files here…',
  'editor.aria': 'Markdown editor',
  'preview.frameTitle': 'Document preview',

  // Toolbar
  'tb.undo': 'Undo (Ctrl+Z)',
  'tb.redo': 'Redo (Ctrl+Y)',
  'tb.heading': 'Heading',
  'tb.normal': 'Normal text',
  'tb.headingN': 'Heading {n}',
  'tb.bold': 'Bold (Ctrl+B)',
  'tb.italic': 'Italic (Ctrl+I)',
  'tb.strike': 'Strikethrough',
  'tb.link': 'Link (Ctrl+K)',
  'tb.image': 'Image',
  'tb.bullets': 'Bulleted list',
  'tb.numbers': 'Numbered list',
  'tb.tasks': 'Task list',
  'tb.quote': 'Quote',
  'tb.code': 'Inline code',
  'tb.codeBlock': 'Code block',
  'tb.table': 'Table',
  'tb.rule': 'Horizontal rule',
  'tb.advanced': 'Advanced editor',
  'tb.headings46': 'Headings 4–6',
  'tb.highlight': 'Highlight ==text==',
  'tb.sup': 'Superscript x^2^',
  'tb.sub': 'Subscript H~2~O',
  'tb.kbd': 'Keyboard key <kbd>',
  'tb.footnote': 'Footnote',
  'tb.details': 'Collapsible section (spoiler)',
  'tb.alert': 'Alert',
  'tb.alertNote': 'Note',
  'tb.alertTip': 'Tip',
  'tb.alertImportant': 'Important',
  'tb.alertWarning': 'Warning',
  'tb.alertCaution': 'Caution',
  'tb.math': 'Math formula',
  'tb.mermaid': 'Mermaid diagram',
  'tb.toc': 'Table of contents',
  'tb.tocEmpty': 'The document has no headings for a table of contents',
  'tb.indent': 'Indent',
  'tb.outdent': 'Outdent',
  'tb.find': 'Find and replace (Ctrl+F)',
  'tb.lineNumbers': 'Line numbers',
  'tb.wrap': 'Word wrap',

  // Text inserted by toolbar commands
  'snip.text': 'text',
  'snip.description': 'description',
  'snip.linkText': 'link text',
  'snip.column': 'Column {n}',
  'snip.cell': 'cell',
  'snip.code': 'code',
  'snip.detailsTitle': 'Title',
  'snip.detailsBody': 'Hidden content',
  'snip.alertText': 'Message text',
  'snip.contents': 'Contents',
  'snip.mmdStart': 'Start',
  'snip.mmdCondition': 'Condition',
  'snip.mmdYes': 'Yes',
  'snip.mmdNo': 'No',
  'snip.mmdResult': 'Result',
  'snip.mmdOther': 'Other path',

  // Rendered document
  'md.note': 'Note',
  'md.tip': 'Tip',
  'md.important': 'Important',
  'md.warning': 'Warning',
  'md.caution': 'Caution',
  'md.frontMatter': 'Front matter',
  'media.image': 'image',
  'media.audio': 'audio',
  'media.video': 'video',
  'pv.link': 'link',
  'pv.embed': 'embedded page',
  'pv.embedReason': 'Embedding third-party pages and players is not supported',
  'pv.embedTitle': 'Embedded page not supported',
  'pv.badgeDanger': 'Blocked (lightweight check):',
  'pv.badgeWarn': 'Suspicious (lightweight check):',
  'pv.empty': 'Empty reference',
  'pv.dangerSource': 'Dangerous source blocked',
  'pv.blockedImage': 'External image blocked — enable "{hint}"',
  'pv.blockedMedia': 'External audio/video blocked — enable "{hint}"',
  'pv.localMissing': 'Local file not found: {path}',
  'pv.localMissingHint': 'Drop it together with the document, or drop the whole folder',
  'pv.fileBlocked': 'File "{name}" blocked',
  'pv.noSource': 'No media source',
  'pv.openDoc': 'Open document {path}',
  'pv.localLink': 'Local file "{path}" is not open — drop it together with the document',
  'pv.linkBlocked': 'Link blocked: {url}',
  'pv.linksDisabled': 'Links are disabled (Full protection): {url}\nEnable "{hint}" to follow them.',
  'pv.diagram': 'Diagram',
  'pv.diagramError': 'Diagram error: {error}',

  // URL threat check
  'url.bidi': 'The address contains invisible text-direction characters — a trick to disguise file names',
  'url.control': 'The address contains control characters — a trick to bypass filters',
  'url.data': 'Inline data (data:) of this type may contain executable code',
  'url.invalid': 'Invalid address',
  'url.scheme': 'Disallowed address type "{scheme}:" — it can run code or open local files',
  'url.credentials': 'The address hides a login/password (user@host) — a classic phishing trick: the real site is the part after "@"',
  'url.localLink': 'Local network address (router, NAS, localhost)',
  'url.localMedia': 'Loading from the local network is forbidden: the document could probe devices on your network',
  'url.ip': 'IP address instead of a domain name',
  'url.unknownTld': 'Unknown top-level domain ".{tld}"',
  'url.scamTld': 'The ".{tld}" domain is frequently used for scams',
  'url.mixed': 'The domain "{host}" mixes alphabets — possibly imitating a well-known site',
  'url.idn': 'Internationalized domain "{host}" — make sure it is not a look-alike of another address',
  'url.shortener': 'URL shortener — the real destination is hidden',
  'url.subdomains': 'Too many subdomains — a trick to disguise the real address',
  'url.port': 'Non-standard port {port}',
  'url.http': 'Unencrypted connection (http://) — content can be altered in transit',
  'url.doubleExt': 'Double extension "{name}" — an executable disguised as a document',
  'url.executable': 'Points to an executable or a macro-enabled document (.{ext})',
  'url.long': 'Very long address',
  'url.encoded': 'Heavily encoded address — may be hiding its content',
  'url.textMismatch': 'The link text shows "{shown}" but it leads to "{host}"',

  // Local file check
  'filecheck.disguised': 'File "{name}" pretends to be media but is actually {what}',
  'filecheck.unknown': 'Could not identify the format of "{name}" from its content',
  'filecheck.mismatch': 'The extension of "{name}" does not match its content ({detected})',
  'filecheck.svgActive': 'SVG "{name}" contains active content (scripts or embedded HTML). It is shown as a plain image, where the browser never runs it',
  'what.exe': 'a Windows executable',
  'what.elf': 'a Linux executable',
  'what.macho': 'a macOS executable',
  'what.script': 'a script',
  'what.html': 'a web page',
  'what.zip': 'a ZIP archive (or Office document)',
  'what.rar': 'a RAR archive',
  'what.7z': 'a 7z archive',
  'what.ole': 'a legacy Office document (may contain macros)',
  'what.pdf': 'a PDF document',

  // Welcome document
  'sample.name': 'Welcome.md',
  'sample.body': `# Markdown Preview Editor

A **Markdown** editor and previewer that works *only inside your browser*.
Documents are never sent anywhere — not to this site, not to anyone else.

> [!TIP]
> Drop a \`.md\` file, several files or a whole folder onto the **left half of the window** — they open in tabs.
> Images dropped together with a document are picked up automatically.

## Features

- [x] Live preview and synchronized scrolling
- [x] Tables, task lists, footnotes[^1], ==highlight==, H~2~O and x^2^
- [x] Code highlighting, math and diagrams
- [ ] Sending your data anywhere — **never**

| Mode | External links | External images |
| :--- | :---: | :---: |
| Full protection | inactive | not loaded |
| With permissions | checked | checked |

## Code

\`\`\`typescript
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
\`\`\`

## Math

Euler's identity: $e^{i\\pi} + 1 = 0$

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}
$$

## Diagrams

\`\`\`mermaid
flowchart LR
    A[.md file] --> B(Browser)
    B --> C{External resources?}
    C -->|Full protection| D[Blocked]
    C -->|Allowed| E[Threat check]
\`\`\`

## Protection in action

This image lives on an external server, so it is not loaded in *Full protection* mode:

![External image](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)

This link stays inactive until "Allow links" is enabled: [CommonMark](https://commonmark.org/).

And this link is suspicious — its text shows one address but it leads to another: [https://bank.example.com](https://bank-example.xyz/login).

---

Shortcuts: <kbd>Ctrl</kbd>+<kbd>B</kbd> bold, <kbd>Ctrl</kbd>+<kbd>I</kbd> italic, <kbd>Ctrl</kbd>+<kbd>K</kbd> link, <kbd>Ctrl</kbd>+<kbd>S</kbd> save, <kbd>Ctrl</kbd>+<kbd>O</kbd> open, <kbd>Ctrl</kbd>+<kbd>F</kbd> find.

[^1]: This is what a footnote looks like.
`,
};

export default en;
