import type { Messages } from '../index';

const zh: Messages = {
  'app.framed': '无法在其他页面中打开本网站。',

  'header.viewMode': '视图模式',
  'view.editor': '编辑器',
  'view.split': '分屏',
  'view.preview': '预览',
  'theme.toggle': '切换主题',
  'theme.light': '浅色主题',
  'theme.dark': '深色主题',
  'settings.title': '设置',
  'file.open': '打开',
  'file.openTitle': '打开文件 (Ctrl+O)',
  'file.folder': '文件夹',
  'file.folderTitle': '打开包含文档和图片的文件夹',
  'file.save': '保存',
  'file.saveTitle': '保存 .md (Ctrl+S)',
  'file.html': 'HTML',
  'file.htmlTitle': '导出为独立的 HTML 文件',
  'file.print': '打印',
  'file.printTitle': '打印或另存为 PDF',
  'menu.title': '菜单',
  'menu.folder': '打开文件夹',
  'menu.save': '另存为 .md',
  'menu.html': '导出为 HTML',
  'menu.print': '打印 / 另存为 PDF',

  'pane.editor': '编辑器',
  'pane.preview': '预览',
  'pane.resize': '调整面板大小',
  'toolbar.formatting': '格式',
  'drop.title': '松开即可打开',
  'drop.hint1': '.md、.txt、图片、音频、视频或整个文件夹。',
  'drop.hint2': '文件只在您的浏览器中读取，绝不会上传。',
  'drop.wrongPlace': '请将文件拖放到编辑器（窗口左侧）',

  'prot.panel': '保护',
  'prot.full': '完全保护',
  'prot.fullDesc': '文档无法访问网络：外部链接不可用，外部图片、音频和视频不会加载。',
  'prot.permissions': '权限',
  'prot.links': '允许链接',
  'prot.linksDesc': '在新标签页中打开，且不会透露本页面的地址。可疑链接需确认后才会打开。',
  'prot.images': '允许外部图片',
  'prot.imagesDesc': '图片服务器会获知您的 IP 地址以及您打开文档的时间。',
  'prot.media': '允许外部音频和视频',
  'prot.mediaDesc': '标准播放器控件，绝不自动播放。',
  'prot.checkTitle': '轻量级威胁检查。',
  'prot.checkText': '链接和媒体还会经过启发式检查：钓鱼手法、仿冒域名、可执行文件、局域网地址。危险内容始终会被拦截。这不是杀毒软件。',
  'prot.localNote': '与文档一起拖入的图片和媒体始终会显示——它们不需要网络。刷新页面后权限会重置。',
  'prot.relaxed': '保护已放宽',
  'prot.fullTooltip': '完全保护：文档无法访问网络',
  'prot.allowed': '已允许：{list}',
  'prot.listLinks': '链接',
  'prot.listImages': '图片',
  'prot.listMedia': '音频和视频',
  'prot.enableHint': '要放宽保护，请开启下方的某项权限',

  'settings.language': '语言',
  'settings.languageAuto': '浏览器语言',
  'settings.sync': '同步滚动',
  'settings.remember': '在此浏览器中记住文档',
  'settings.rememberOn': '已开启：已打开文档的文本会保存在此浏览器中（不含图片）。在公用电脑上请关闭。',
  'settings.rememberOff': '已关闭：关闭浏览器标签页会清除所有内容。请只在个人电脑上开启。',
  'settings.clear': '全部清除',
  'settings.clearNote': '关闭所有文档，并将其从内存和浏览器存储中删除。',
  'settings.privacy': '所有文档都只在您的浏览器中处理。本网站没有任何统计分析，也绝不会连接第三方服务器。',

  'tab.untitled': '未命名 {n}.md',
  'tab.close': '关闭',
  'tab.closeNamed': '关闭 {name}',
  'tab.new': '新建文档',
  'dialog.cancel': '取消',
  'dialog.close': '关闭',
  'close.title': '不保存就关闭？',
  'close.body': '“{name}”有未保存的更改，这些更改将会丢失。',
  'clear.title': '全部清除？',
  'clear.body': '所有已打开的文档都将关闭，并从内存和浏览器存储中删除。未保存的更改将会丢失。',
  'clear.ok': '清除',
  'clear.done': '已全部清除',

  'status.counts': '词数：{words} · 字符：{chars} · 行数：{lines} · 约 {minutes} 分钟读完',
  'status.blocked': '被保护拦截：{n}',
  'status.dangers': '危险：{n}',
  'status.warnings': '可疑：{n}',
  'status.missing': '缺少文件：{n}',
  'status.details': '查看详情',
  'status.private': '仅在您的浏览器中',
  'status.privateTitle': '文档绝不会离开您的浏览器：本网站没有接收文档的服务器，其安全策略也禁止任何网络请求。',

  'issues.title': '外部资源与威胁检查',
  'issues.danger': '危险——已拦截',
  'issues.warn': '可疑',
  'issues.blocked': '被保护模式拦截',
  'issues.missing': '未找到本地文件',
  'issues.unsupported': '不支持',
  'issues.note': '这是轻量级检查：在浏览器中运行的启发式规则，不会把地址发送给任何在线服务。它不是杀毒软件。',

  'link.title': '可疑链接',
  'link.found': '轻量级检查发现了以下警示信号：',
  'link.address': '地址：',
  'link.note': '这只是启发式判断，并非杀毒软件。请仅在信任来源时打开。',
  'link.open': '仍然打开',

  'files.opened': '已打开文档：{n}',
  'files.media': '媒体文件：{n}',
  'files.skipped': '已跳过：{n}（{names}）',
  'files.readError': '无法读取文件：{error}',
  'files.tooLarge': '文件“{name}”过大（超过 20 MB）',
  'files.notText': '文件“{name}”看起来不是文本文件',
  'save.done': '已保存：{name}（保存在浏览器的下载文件夹中）',
  'export.done': '已导出：{name}',
  'render.error': '显示出错：{error}',

  'editor.placeholder': '开始编写 Markdown，或将文件拖放到这里…',
  'editor.aria': 'Markdown 编辑器',
  'preview.frameTitle': '文档预览',

  'tb.undo': '撤销 (Ctrl+Z)',
  'tb.redo': '重做 (Ctrl+Y)',
  'tb.heading': '标题',
  'tb.normal': '正文',
  'tb.headingN': '标题 {n}',
  'tb.bold': '粗体 (Ctrl+B)',
  'tb.italic': '斜体 (Ctrl+I)',
  'tb.strike': '删除线',
  'tb.link': '链接 (Ctrl+K)',
  'tb.image': '图片',
  'tb.bullets': '无序列表',
  'tb.numbers': '有序列表',
  'tb.tasks': '任务列表',
  'tb.quote': '引用',
  'tb.code': '行内代码',
  'tb.codeBlock': '代码块',
  'tb.table': '表格',
  'tb.rule': '分隔线',
  'tb.advanced': '高级编辑器',
  'tb.headings46': '标题 4–6',
  'tb.highlight': '高亮 ==文本==',
  'tb.sup': '上标 x^2^',
  'tb.sub': '下标 H~2~O',
  'tb.kbd': '按键 <kbd>',
  'tb.footnote': '脚注',
  'tb.details': '可折叠区块（剧透）',
  'tb.alert': '提示框',
  'tb.alertNote': '注意',
  'tb.alertTip': '提示',
  'tb.alertImportant': '重要',
  'tb.alertWarning': '警告',
  'tb.alertCaution': '小心',
  'tb.math': '数学公式',
  'tb.mermaid': 'Mermaid 图表',
  'tb.toc': '目录',
  'tb.tocEmpty': '文档中没有可用于生成目录的标题',
  'tb.indent': '增加缩进',
  'tb.outdent': '减少缩进',
  'tb.find': '查找和替换 (Ctrl+F)',
  'tb.lineNumbers': '行号',
  'tb.wrap': '自动换行',

  'snip.text': '文本',
  'snip.description': '描述',
  'snip.linkText': '链接文字',
  'snip.column': '第 {n} 列',
  'snip.cell': '单元格',
  'snip.code': '代码',
  'snip.detailsTitle': '标题',
  'snip.detailsBody': '隐藏内容',
  'snip.alertText': '消息内容',
  'snip.contents': '目录',
  'snip.mmdStart': '开始',
  'snip.mmdCondition': '条件',
  'snip.mmdYes': '是',
  'snip.mmdNo': '否',
  'snip.mmdResult': '结果',
  'snip.mmdOther': '其他路径',

  'md.note': '注意',
  'md.tip': '提示',
  'md.important': '重要',
  'md.warning': '警告',
  'md.caution': '小心',
  'md.frontMatter': '元数据（front matter）',
  'media.image': '图片',
  'media.audio': '音频',
  'media.video': '视频',
  'pv.link': '链接',
  'pv.embed': '嵌入页面',
  'pv.embedReason': '不支持嵌入第三方页面和播放器',
  'pv.embedTitle': '不支持嵌入页面',
  'pv.badgeDanger': '已拦截（轻量级检查）：',
  'pv.badgeWarn': '可疑（轻量级检查）：',
  'pv.empty': '空引用',
  'pv.dangerSource': '已拦截危险来源',
  'pv.blockedImage': '外部图片已拦截——请开启“{hint}”',
  'pv.blockedMedia': '外部音频/视频已拦截——请开启“{hint}”',
  'pv.localMissing': '未找到本地文件：{path}',
  'pv.localMissingHint': '请与文档一起拖入，或拖入整个文件夹',
  'pv.fileBlocked': '文件“{name}”已被拦截',
  'pv.noSource': '没有媒体来源',
  'pv.openDoc': '打开文档 {path}',
  'pv.localLink': '本地文件“{path}”未打开——请与文档一起拖入',
  'pv.linkBlocked': '链接已拦截：{url}',
  'pv.linksDisabled': '链接已禁用（完全保护）：{url}\n开启“{hint}”后才能打开链接。',
  'pv.diagram': '图表',
  'pv.diagramError': '图表出错：{error}',

  'url.bidi': '地址中包含不可见的文字方向字符——这是伪装文件名的手法',
  'url.control': '地址中包含控制字符——这是绕过过滤的手法',
  'url.data': '此类嵌入数据（data:）可能包含可执行代码',
  'url.invalid': '无效地址',
  'url.scheme': '不允许的地址类型“{scheme}:”——它可以运行代码或打开本地文件',
  'url.credentials': '地址中藏有用户名或密码（user@host）——典型的钓鱼手法：真正的网站是“@”后面的部分',
  'url.localLink': '局域网地址（路由器、NAS、localhost）',
  'url.localMedia': '禁止从局域网加载：文档可能借此探测您网络中的设备',
  'url.ip': '使用 IP 地址而非域名',
  'url.unknownTld': '未知的顶级域名“.{tld}”',
  'url.scamTld': '“.{tld}”域名经常被用于诈骗',
  'url.mixed': '域名“{host}”混用了不同文字——可能在仿冒知名网站',
  'url.idn': '国际化域名“{host}”——请确认它没有仿冒相似的地址',
  'url.shortener': '短链接服务——真实目标被隐藏',
  'url.subdomains': '子域名过多——这是伪装真实地址的手法',
  'url.port': '非标准端口 {port}',
  'url.http': '未加密的连接（http://）——内容可能在传输途中被篡改',
  'url.doubleExt': '双重扩展名“{name}”——伪装成文档的可执行文件',
  'url.executable': '指向可执行文件或含宏的文档（.{ext}）',
  'url.long': '地址过长',
  'url.encoded': '地址经过大量编码——可能在隐藏其内容',
  'url.textMismatch': '链接文字显示为“{shown}”，实际却指向“{host}”',

  'filecheck.disguised': '文件“{name}”伪装成媒体文件，实际上是{what}',
  'filecheck.unknown': '无法根据内容识别“{name}”的格式',
  'filecheck.mismatch': '“{name}”的扩展名与内容不符（{detected}）',
  'filecheck.svgActive': 'SVG“{name}”包含活动内容（脚本或嵌入的 HTML）。它会以普通图片的形式显示，浏览器在这种情况下绝不会执行这些内容',
  'what.exe': 'Windows 可执行文件',
  'what.elf': 'Linux 可执行文件',
  'what.macho': 'macOS 可执行文件',
  'what.script': '脚本',
  'what.html': '网页',
  'what.zip': 'ZIP 压缩包（或 Office 文档）',
  'what.rar': 'RAR 压缩包',
  'what.7z': '7z 压缩包',
  'what.ole': '旧版 Office 文档（可能含有宏）',
  'what.pdf': 'PDF 文档',

  'sample.name': '欢迎.md',
  'sample.body': `# Markdown Preview Editor

一款*只在您的浏览器中*运行、带预览功能的 **Markdown** 编辑器。
文档绝不会被发送到任何地方——既不会发送到本网站，也不会发送给任何人。

> [!TIP]
> 将一个 \`.md\` 文件、多个文件或整个文件夹拖放到**窗口左半部分**，它们会在标签页中打开。
> 与文档一起拖入的图片会自动关联。

## 功能

- [x] 实时预览与同步滚动
- [x] 表格、任务列表、脚注[^1]、==高亮==、H~2~O 和 x^2^
- [x] 代码高亮、公式和图表
- [ ] 把您的数据发送到任何地方——**绝不**

| 模式 | 外部链接 | 外部图片 |
| :--- | :---: | :---: |
| 完全保护 | 不可用 | 不加载 |
| 开启权限 | 经过检查 | 经过检查 |

## 代码

\`\`\`typescript
function greet(name: string): string {
  return \`你好，\${name}！\`;
}
\`\`\`

## 公式

欧拉恒等式：$e^{i\\pi} + 1 = 0$

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}
$$

## 图表

\`\`\`mermaid
flowchart LR
    A[.md 文件] --> B(浏览器)
    B --> C{外部资源？}
    C -->|完全保护| D[已拦截]
    C -->|已允许| E[威胁检查]
\`\`\`

## 保护功能实例

这张图片位于外部服务器上，因此在*完全保护*模式下不会加载：

![外部图片](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)

在开启“允许链接”之前，这个链接不可用：[CommonMark](https://commonmark.org/)。

而这个链接是可疑的——它的文字显示一个地址，实际却指向另一个地址：[https://bank.example.com](https://bank-example.xyz/login)。

---

快捷键：<kbd>Ctrl</kbd>+<kbd>B</kbd> 粗体，<kbd>Ctrl</kbd>+<kbd>I</kbd> 斜体，<kbd>Ctrl</kbd>+<kbd>K</kbd> 链接，<kbd>Ctrl</kbd>+<kbd>S</kbd> 保存，<kbd>Ctrl</kbd>+<kbd>O</kbd> 打开，<kbd>Ctrl</kbd>+<kbd>F</kbd> 查找。

[^1]: 脚注就是这个样子。
`,
};

export default zh;
