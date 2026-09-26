import type { Messages } from '../index';

const ja: Messages = {
  'app.framed': 'このサイトは他のページ内で開くことはできません。',

  'header.viewMode': '表示モード',
  'view.editor': 'エディター',
  'view.split': '分割',
  'view.preview': 'プレビュー',
  'theme.toggle': 'テーマを切り替え',
  'theme.light': 'ライトテーマ',
  'theme.dark': 'ダークテーマ',
  'settings.title': '設定',
  'file.open': '開く',
  'file.openTitle': 'ファイルを開く (Ctrl+O)',
  'file.folder': 'フォルダー',
  'file.folderTitle': 'ドキュメントと画像を含むフォルダーを開く',
  'file.save': '保存',
  'file.saveTitle': '.md を保存 (Ctrl+S)',
  'file.html': 'HTML',
  'file.htmlTitle': '単体で動作する HTML ファイルにエクスポート',
  'file.print': '印刷',
  'file.printTitle': '印刷または PDF として保存',
  'menu.title': 'メニュー',
  'menu.folder': 'フォルダーを開く',
  'menu.save': '.md として保存',
  'menu.html': 'HTML にエクスポート',
  'menu.print': '印刷 / PDF として保存',

  'pane.editor': 'エディター',
  'pane.preview': 'プレビュー',
  'pane.resize': 'パネルのサイズを変更',
  'toolbar.formatting': '書式',
  'drop.title': 'ドロップして開く',
  'drop.hint1': '.md、.txt、画像、音声、動画、またはフォルダーごと。',
  'drop.hint2': 'ファイルはブラウザー内でのみ読み込まれ、アップロードされることはありません。',
  'drop.wrongPlace': 'ファイルはエディター（ウィンドウの左側）にドロップしてください',

  'prot.panel': '保護',
  'prot.full': '完全保護',
  'prot.fullDesc': 'ドキュメントはネットワークにアクセスできません。外部リンクは無効になり、外部の画像・音声・動画は読み込まれません。',
  'prot.permissions': '許可',
  'prot.links': 'リンクを許可',
  'prot.linksDesc': 'このページのアドレスを伝えずに新しいタブで開きます。不審なリンクは確認後にのみ開きます。',
  'prot.images': '外部画像を許可',
  'prot.imagesDesc': '画像のサーバーに、あなたの IP アドレスとドキュメントを開いた時刻が伝わります。',
  'prot.media': '外部の音声と動画を許可',
  'prot.mediaDesc': '標準のプレーヤー操作のみで、自動再生はしません。',
  'prot.checkTitle': '簡易脅威チェック。',
  'prot.checkText': 'リンクとメディアはヒューリスティックでもチェックされます（フィッシングの手口、なりすましドメイン、実行ファイル、ローカルネットワークのアドレスなど）。危険なものは常にブロックされます。これはウイルス対策ソフトではありません。',
  'prot.localNote': 'ドキュメントと一緒にドロップした画像やメディアは常に表示されます（ネットワークは不要です）。許可はページを再読み込みするとリセットされます。',
  'prot.relaxed': '保護を緩和中',
  'prot.fullTooltip': '完全保護：ドキュメントはネットワークにアクセスできません',
  'prot.allowed': '許可中：{list}',
  'prot.listLinks': 'リンク',
  'prot.listImages': '画像',
  'prot.listMedia': '音声と動画',
  'prot.enableHint': '保護を緩めるには、下の許可のいずれかをオンにしてください',

  'settings.language': '言語',
  'settings.languageAuto': 'ブラウザーの言語',
  'settings.sync': 'スクロールを同期',
  'settings.remember': 'このブラウザーにドキュメントを記憶',
  'settings.rememberOn': 'オン：開いているドキュメントのテキストをこのブラウザーに保存します（画像は除く）。共用のコンピューターではオフにしてください。',
  'settings.rememberOff': 'オフ：ブラウザーのタブを閉じるとすべて消去されます。個人のコンピューターでのみオンにしてください。',
  'settings.clear': 'すべて消去',
  'settings.clearNote': 'すべてのドキュメントを閉じ、メモリとブラウザーのストレージから削除します。',
  'settings.privacy': 'すべてのドキュメントはブラウザー内でのみ処理されます。このサイトにはアクセス解析がなく、第三者のサーバーに接続することもありません。',

  'tab.untitled': '無題 {n}.md',
  'tab.close': '閉じる',
  'tab.closeNamed': '{name} を閉じる',
  'tab.new': '新しいドキュメント',
  'dialog.cancel': 'キャンセル',
  'dialog.close': '閉じる',
  'close.title': '保存せずに閉じますか？',
  'close.body': '「{name}」には保存されていない変更があります。変更は失われます。',
  'clear.title': 'すべて消去しますか？',
  'clear.body': '開いているすべてのドキュメントを閉じ、メモリとブラウザーのストレージから削除します。保存されていない変更は失われます。',
  'clear.ok': '消去',
  'clear.done': 'すべて消去しました',

  'status.counts': '単語: {words} · 文字: {chars} · 行: {lines} · 約 {minutes} 分で読めます',
  'status.blocked': '保護によりブロック: {n}',
  'status.dangers': '危険: {n}',
  'status.warnings': '不審: {n}',
  'status.missing': '見つからないファイル: {n}',
  'status.details': '詳細を表示',
  'status.private': 'ブラウザー内のみ',
  'status.privateTitle': 'ドキュメントがブラウザーの外に出ることはありません。このサイトにはドキュメントを受け取るサーバーがなく、セキュリティポリシーによりネットワーク通信も禁止されています。',

  'issues.title': '外部リソースと脅威チェック',
  'issues.danger': '危険 — ブロック済み',
  'issues.warn': '不審',
  'issues.blocked': '保護モードによりブロック',
  'issues.missing': 'ローカルファイルが見つかりません',
  'issues.unsupported': '非対応',
  'issues.note': 'これは簡易チェックです。アドレスをオンラインサービスに送信せず、ブラウザー内でヒューリスティックを実行します。ウイルス対策ソフトではありません。',

  'link.title': '不審なリンク',
  'link.found': '簡易チェックで警告サインが見つかりました：',
  'link.address': 'アドレス：',
  'link.note': 'これはヒューリスティックであり、ウイルス対策ソフトではありません。信頼できる送信元の場合のみ開いてください。',
  'link.open': 'それでも開く',

  'files.opened': '開いたドキュメント: {n}',
  'files.media': 'メディアファイル: {n}',
  'files.skipped': 'スキップ: {n}（{names}）',
  'files.readError': 'ファイルを読み込めませんでした: {error}',
  'files.tooLarge': 'ファイル「{name}」が大きすぎます（20 MB 超）',
  'files.notText': 'ファイル「{name}」はテキストファイルではないようです',
  'save.done': '保存しました: {name}（ブラウザーのダウンロードフォルダー）',
  'export.done': 'エクスポートしました: {name}',
  'render.error': '表示エラー: {error}',

  'editor.placeholder': 'Markdown を書き始めるか、ここにファイルをドロップしてください…',
  'editor.aria': 'Markdown エディター',
  'preview.frameTitle': 'ドキュメントのプレビュー',

  'tb.undo': '元に戻す (Ctrl+Z)',
  'tb.redo': 'やり直す (Ctrl+Y)',
  'tb.heading': '見出し',
  'tb.normal': '標準テキスト',
  'tb.headingN': '見出し {n}',
  'tb.bold': '太字 (Ctrl+B)',
  'tb.italic': '斜体 (Ctrl+I)',
  'tb.strike': '取り消し線',
  'tb.link': 'リンク (Ctrl+K)',
  'tb.image': '画像',
  'tb.bullets': '箇条書き',
  'tb.numbers': '番号付きリスト',
  'tb.tasks': 'タスクリスト',
  'tb.quote': '引用',
  'tb.code': 'インラインコード',
  'tb.codeBlock': 'コードブロック',
  'tb.table': '表',
  'tb.rule': '水平線',
  'tb.advanced': '高度なエディター',
  'tb.headings46': '見出し 4〜6',
  'tb.highlight': 'ハイライト ==テキスト==',
  'tb.sup': '上付き x^2^',
  'tb.sub': '下付き H~2~O',
  'tb.kbd': 'キー表記 <kbd>',
  'tb.footnote': '脚注',
  'tb.details': '折りたたみセクション（スポイラー）',
  'tb.alert': 'アラート',
  'tb.alertNote': '注記',
  'tb.alertTip': 'ヒント',
  'tb.alertImportant': '重要',
  'tb.alertWarning': '警告',
  'tb.alertCaution': '注意',
  'tb.math': '数式',
  'tb.mermaid': 'Mermaid 図',
  'tb.toc': '目次',
  'tb.tocEmpty': 'ドキュメントに目次を作るための見出しがありません',
  'tb.indent': 'インデントを増やす',
  'tb.outdent': 'インデントを減らす',
  'tb.find': '検索と置換 (Ctrl+F)',
  'tb.lineNumbers': '行番号',
  'tb.wrap': '折り返し',

  'snip.text': 'テキスト',
  'snip.description': '説明',
  'snip.linkText': 'リンクテキスト',
  'snip.column': '列 {n}',
  'snip.cell': 'セル',
  'snip.code': 'コード',
  'snip.detailsTitle': 'タイトル',
  'snip.detailsBody': '隠れた内容',
  'snip.alertText': 'メッセージ本文',
  'snip.contents': '目次',
  'snip.mmdStart': '開始',
  'snip.mmdCondition': '条件',
  'snip.mmdYes': 'はい',
  'snip.mmdNo': 'いいえ',
  'snip.mmdResult': '結果',
  'snip.mmdOther': '別のルート',

  'md.note': '注記',
  'md.tip': 'ヒント',
  'md.important': '重要',
  'md.warning': '警告',
  'md.caution': '注意',
  'md.frontMatter': 'フロントマター',
  'media.image': '画像',
  'media.audio': '音声',
  'media.video': '動画',
  'pv.link': 'リンク',
  'pv.embed': '埋め込みページ',
  'pv.embedReason': '第三者のページやプレーヤーの埋め込みには対応していません',
  'pv.embedTitle': '埋め込みページには対応していません',
  'pv.badgeDanger': 'ブロック（簡易チェック）：',
  'pv.badgeWarn': '不審（簡易チェック）：',
  'pv.empty': '参照先が空です',
  'pv.dangerSource': '危険な参照元をブロックしました',
  'pv.blockedImage': '外部画像をブロックしました —「{hint}」をオンにしてください',
  'pv.blockedMedia': '外部の音声・動画をブロックしました —「{hint}」をオンにしてください',
  'pv.localMissing': 'ローカルファイルが見つかりません: {path}',
  'pv.localMissingHint': 'ドキュメントと一緒にドロップするか、フォルダーごとドロップしてください',
  'pv.fileBlocked': 'ファイル「{name}」をブロックしました',
  'pv.noSource': 'メディアの参照元がありません',
  'pv.openDoc': 'ドキュメント {path} を開く',
  'pv.localLink': 'ローカルファイル「{path}」は開かれていません — ドキュメントと一緒にドロップしてください',
  'pv.linkBlocked': 'リンクをブロックしました: {url}',
  'pv.linksDisabled': 'リンクは無効です（完全保護）: {url}\nリンク先に移動するには「{hint}」をオンにしてください。',
  'pv.diagram': '図',
  'pv.diagramError': '図のエラー: {error}',

  'url.bidi': 'アドレスに不可視の文字方向制御文字が含まれています — ファイル名を偽装する手口です',
  'url.control': 'アドレスに制御文字が含まれています — フィルターを回避する手口です',
  'url.data': 'この種類の埋め込みデータ（data:）には実行可能なコードが含まれる可能性があります',
  'url.invalid': '無効なアドレス',
  'url.scheme': '許可されていないアドレスの種類「{scheme}:」 — コードの実行やローカルファイルを開くことができます',
  'url.credentials': 'アドレスにユーザー名やパスワード（user@host）が隠されています — 典型的なフィッシングの手口で、本当のサイトは「@」の後ろです',
  'url.localLink': 'ローカルネットワークのアドレス（ルーター、NAS、localhost）',
  'url.localMedia': 'ローカルネットワークからの読み込みは禁止されています：ドキュメントがネットワーク内の機器を探る恐れがあります',
  'url.ip': 'ドメイン名ではなく IP アドレス',
  'url.unknownTld': '不明なトップレベルドメイン「.{tld}」',
  'url.scamTld': '「.{tld}」ドメインは詐欺によく使われます',
  'url.mixed': 'ドメイン「{host}」は複数の文字体系が混在しています — 有名なサイトになりすましている可能性があります',
  'url.idn': '国際化ドメイン「{host}」 — よく似た別のアドレスのなりすましでないか確認してください',
  'url.shortener': '短縮 URL — 実際のリンク先が隠されています',
  'url.subdomains': 'サブドメインが多すぎます — 本当のアドレスを隠す手口です',
  'url.port': '標準外のポート {port}',
  'url.http': '暗号化されていない接続（http://） — 途中で内容が改ざんされる恐れがあります',
  'url.doubleExt': '二重拡張子「{name}」 — ドキュメントに偽装した実行ファイルです',
  'url.executable': '実行ファイルまたはマクロ付きドキュメントを指しています（.{ext}）',
  'url.long': '非常に長いアドレス',
  'url.encoded': '過度にエンコードされたアドレス — 内容を隠している可能性があります',
  'url.textMismatch': 'リンクの表示は「{shown}」ですが、実際のリンク先は「{host}」です',

  'filecheck.disguised': 'ファイル「{name}」はメディアを装っていますが、実際は{what}です',
  'filecheck.unknown': '「{name}」の形式を内容から特定できませんでした',
  'filecheck.mismatch': '「{name}」の拡張子が内容と一致しません（{detected}）',
  'filecheck.svgActive': 'SVG「{name}」にはアクティブなコンテンツ（スクリプトや埋め込み HTML）が含まれています。ブラウザーがそれを実行しない通常の画像として表示されます',
  'what.exe': 'Windows の実行ファイル',
  'what.elf': 'Linux の実行ファイル',
  'what.macho': 'macOS の実行ファイル',
  'what.script': 'スクリプト',
  'what.html': 'Web ページ',
  'what.zip': 'ZIP アーカイブ（または Office ドキュメント）',
  'what.rar': 'RAR アーカイブ',
  'what.7z': '7z アーカイブ',
  'what.ole': '旧形式の Office ドキュメント（マクロを含む可能性あり）',
  'what.pdf': 'PDF ドキュメント',

  'sample.name': 'ようこそ.md',
  'sample.body': `# Markdown Preview Editor

*ブラウザー内だけ*で動作する、プレビュー付きの **Markdown** エディターです。
ドキュメントはどこにも送信されません。このサイトにも、ほかの誰にもです。

> [!TIP]
> \`.md\` ファイル、複数のファイル、またはフォルダーごと**ウィンドウの左半分**にドロップすると、タブで開きます。
> ドキュメントと一緒にドロップした画像は自動的に表示されます。

## 機能

- [x] ライブプレビューとスクロール同期
- [x] 表、タスクリスト、脚注[^1]、==ハイライト==、H~2~O と x^2^
- [x] コードのハイライト、数式、図
- [ ] データをどこかへ送信すること — **一切なし**

| モード | 外部リンク | 外部画像 |
| :--- | :---: | :---: |
| 完全保護 | 無効 | 読み込まない |
| 許可あり | チェック済み | チェック済み |

## コード

\`\`\`typescript
function greet(name: string): string {
  return \`こんにちは、\${name}さん！\`;
}
\`\`\`

## 数式

オイラーの等式: $e^{i\\pi} + 1 = 0$

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}
$$

## 図

\`\`\`mermaid
flowchart LR
    A[.md ファイル] --> B(ブラウザー)
    B --> C{外部リソース？}
    C -->|完全保護| D[ブロック]
    C -->|許可| E[脅威チェック]
\`\`\`

## 保護の動作例

この画像は外部サーバーにあるため、*完全保護*モードでは読み込まれません：

![外部画像](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)

このリンクは「リンクを許可」をオンにするまで無効です: [CommonMark](https://commonmark.org/)。

そしてこのリンクは不審です。表示されているアドレスと実際のリンク先が異なります: [https://bank.example.com](https://bank-example.xyz/login)。

---

ショートカット: <kbd>Ctrl</kbd>+<kbd>B</kbd> 太字、<kbd>Ctrl</kbd>+<kbd>I</kbd> 斜体、<kbd>Ctrl</kbd>+<kbd>K</kbd> リンク、<kbd>Ctrl</kbd>+<kbd>S</kbd> 保存、<kbd>Ctrl</kbd>+<kbd>O</kbd> 開く、<kbd>Ctrl</kbd>+<kbd>F</kbd> 検索。

[^1]: 脚注はこのように表示されます。
`,
};

export default ja;
