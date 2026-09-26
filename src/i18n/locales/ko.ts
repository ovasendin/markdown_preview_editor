import type { Messages } from '../index';

const ko: Messages = {
  'app.framed': '이 사이트는 다른 페이지 안에서 열 수 없습니다.',

  'header.viewMode': '보기 모드',
  'view.editor': '편집기',
  'view.split': '분할',
  'view.preview': '미리 보기',
  'theme.toggle': '테마 전환',
  'theme.light': '밝은 테마',
  'theme.dark': '어두운 테마',
  'settings.title': '설정',
  'file.open': '열기',
  'file.openTitle': '파일 열기 (Ctrl+O)',
  'file.folder': '폴더',
  'file.folderTitle': '문서와 이미지가 있는 폴더 열기',
  'file.save': '저장',
  'file.saveTitle': '.md 저장 (Ctrl+S)',
  'file.html': 'HTML',
  'file.htmlTitle': '독립 실행형 HTML 파일로 내보내기',
  'file.print': '인쇄',
  'file.printTitle': '인쇄 또는 PDF로 저장',
  'menu.title': '메뉴',
  'menu.folder': '폴더 열기',
  'menu.save': '.md로 저장',
  'menu.html': 'HTML로 내보내기',
  'menu.print': '인쇄 / PDF로 저장',

  'pane.editor': '편집기',
  'pane.preview': '미리 보기',
  'pane.resize': '패널 크기 조정',
  'toolbar.formatting': '서식',
  'drop.title': '놓아서 열기',
  'drop.hint1': '.md, .txt, 이미지, 오디오, 동영상 또는 폴더 전체.',
  'drop.hint2': '파일은 브라우저 안에서만 읽히며 업로드되지 않습니다.',
  'drop.wrongPlace': '파일을 편집기(창의 왼쪽)에 놓으세요',

  'prot.panel': '보호',
  'prot.full': '완전 보호',
  'prot.fullDesc': '문서가 네트워크에 접근할 수 없습니다. 외부 링크는 비활성화되고 외부 이미지, 오디오, 동영상은 불러오지 않습니다.',
  'prot.permissions': '권한',
  'prot.links': '링크 허용',
  'prot.linksDesc': '이 페이지의 주소를 알리지 않고 새 탭에서 엽니다. 의심스러운 링크는 확인 후에만 엽니다.',
  'prot.images': '외부 이미지 허용',
  'prot.imagesDesc': '이미지 서버가 사용자의 IP 주소와 문서를 연 시각을 알 수 있습니다.',
  'prot.media': '외부 오디오 및 동영상 허용',
  'prot.mediaDesc': '표준 플레이어 컨트롤만 제공하며 자동 재생은 하지 않습니다.',
  'prot.checkTitle': '간단한 위협 검사.',
  'prot.checkText': '링크와 미디어는 휴리스틱으로도 검사합니다: 피싱 수법, 사칭 도메인, 실행 파일, 로컬 네트워크 주소 등. 위험한 항목은 항상 차단됩니다. 백신 프로그램은 아닙니다.',
  'prot.localNote': '문서와 함께 놓은 이미지와 미디어는 항상 표시됩니다. 네트워크가 필요 없기 때문입니다. 권한은 페이지를 새로 고치면 초기화됩니다.',
  'prot.relaxed': '보호 완화됨',
  'prot.fullTooltip': '완전 보호: 문서가 네트워크에 접근할 수 없습니다',
  'prot.allowed': '허용됨: {list}',
  'prot.listLinks': '링크',
  'prot.listImages': '이미지',
  'prot.listMedia': '오디오 및 동영상',
  'prot.enableHint': '보호를 완화하려면 아래 권한 중 하나를 켜세요',

  'settings.language': '언어',
  'settings.languageAuto': '브라우저 언어',
  'settings.sync': '스크롤 동기화',
  'settings.remember': '이 브라우저에 문서 기억하기',
  'settings.rememberOn': '켜짐: 열린 문서의 텍스트가 이 브라우저에 저장됩니다(이미지 제외). 공용 컴퓨터에서는 끄세요.',
  'settings.rememberOff': '꺼짐: 브라우저 탭을 닫으면 모두 지워집니다. 개인 컴퓨터에서만 켜세요.',
  'settings.clear': '모두 지우기',
  'settings.clearNote': '모든 문서를 닫고 메모리와 브라우저 저장소에서 삭제합니다.',
  'settings.privacy': '모든 문서는 브라우저 안에서만 처리됩니다. 이 사이트에는 분석 도구가 없으며 제3자 서버에 연결하지 않습니다.',

  'tab.untitled': '제목 없음 {n}.md',
  'tab.close': '닫기',
  'tab.closeNamed': '{name} 닫기',
  'tab.new': '새 문서',
  'dialog.cancel': '취소',
  'dialog.close': '닫기',
  'close.title': '저장하지 않고 닫을까요?',
  'close.body': '"{name}"에 저장하지 않은 변경 사항이 있습니다. 변경 사항은 사라집니다.',
  'clear.title': '모두 지울까요?',
  'clear.body': '열려 있는 모든 문서를 닫고 메모리와 브라우저 저장소에서 삭제합니다. 저장하지 않은 변경 사항은 사라집니다.',
  'clear.ok': '지우기',
  'clear.done': '모두 지웠습니다',

  'status.counts': '단어: {words} · 문자: {chars} · 줄: {lines} · 읽는 데 약 {minutes}분',
  'status.blocked': '보호로 차단됨: {n}',
  'status.dangers': '위험: {n}',
  'status.warnings': '의심: {n}',
  'status.missing': '누락된 파일: {n}',
  'status.details': '자세히 보기',
  'status.private': '브라우저 안에서만',
  'status.privateTitle': '문서는 브라우저 밖으로 나가지 않습니다. 이 사이트에는 문서를 받을 서버가 없고, 보안 정책에 따라 네트워크 요청도 금지되어 있습니다.',

  'issues.title': '외부 리소스와 위협 검사',
  'issues.danger': '위험 — 차단됨',
  'issues.warn': '의심',
  'issues.blocked': '보호 모드로 차단됨',
  'issues.missing': '로컬 파일을 찾을 수 없음',
  'issues.unsupported': '지원되지 않음',
  'issues.note': '간단한 검사입니다. 주소를 온라인 서비스로 보내지 않고 브라우저 안에서 휴리스틱을 실행합니다. 백신 프로그램은 아닙니다.',

  'link.title': '의심스러운 링크',
  'link.found': '간단한 검사에서 경고 신호가 발견되었습니다:',
  'link.address': '주소:',
  'link.note': '휴리스틱일 뿐 백신 프로그램은 아닙니다. 출처를 신뢰할 때만 여세요.',
  'link.open': '그래도 열기',

  'files.opened': '연 문서: {n}',
  'files.media': '미디어 파일: {n}',
  'files.skipped': '건너뜀: {n} ({names})',
  'files.readError': '파일을 읽을 수 없습니다: {error}',
  'files.tooLarge': '"{name}" 파일이 너무 큽니다(20MB 초과)',
  'files.notText': '"{name}" 파일은 텍스트 파일이 아닌 것 같습니다',
  'save.done': '저장됨: {name} (브라우저의 다운로드 폴더)',
  'export.done': '내보냄: {name}',
  'render.error': '표시 오류: {error}',

  'editor.placeholder': 'Markdown을 작성하거나 파일을 여기에 놓으세요…',
  'editor.aria': 'Markdown 편집기',
  'preview.frameTitle': '문서 미리 보기',

  'tb.undo': '실행 취소 (Ctrl+Z)',
  'tb.redo': '다시 실행 (Ctrl+Y)',
  'tb.heading': '제목',
  'tb.normal': '일반 텍스트',
  'tb.headingN': '제목 {n}',
  'tb.bold': '굵게 (Ctrl+B)',
  'tb.italic': '기울임꼴 (Ctrl+I)',
  'tb.strike': '취소선',
  'tb.link': '링크 (Ctrl+K)',
  'tb.image': '이미지',
  'tb.bullets': '글머리 기호 목록',
  'tb.numbers': '번호 매기기 목록',
  'tb.tasks': '할 일 목록',
  'tb.quote': '인용',
  'tb.code': '인라인 코드',
  'tb.codeBlock': '코드 블록',
  'tb.table': '표',
  'tb.rule': '가로줄',
  'tb.advanced': '고급 편집기',
  'tb.headings46': '제목 4–6',
  'tb.highlight': '강조 표시 ==텍스트==',
  'tb.sup': '위 첨자 x^2^',
  'tb.sub': '아래 첨자 H~2~O',
  'tb.kbd': '키보드 키 <kbd>',
  'tb.footnote': '각주',
  'tb.details': '접을 수 있는 섹션(스포일러)',
  'tb.alert': '알림 상자',
  'tb.alertNote': '참고',
  'tb.alertTip': '팁',
  'tb.alertImportant': '중요',
  'tb.alertWarning': '경고',
  'tb.alertCaution': '주의',
  'tb.math': '수식',
  'tb.mermaid': 'Mermaid 다이어그램',
  'tb.toc': '목차',
  'tb.tocEmpty': '문서에 목차를 만들 제목이 없습니다',
  'tb.indent': '들여쓰기',
  'tb.outdent': '내어쓰기',
  'tb.find': '찾기 및 바꾸기 (Ctrl+F)',
  'tb.lineNumbers': '줄 번호',
  'tb.wrap': '자동 줄 바꿈',

  'snip.text': '텍스트',
  'snip.description': '설명',
  'snip.linkText': '링크 텍스트',
  'snip.column': '열 {n}',
  'snip.cell': '셀',
  'snip.code': '코드',
  'snip.detailsTitle': '제목',
  'snip.detailsBody': '숨겨진 내용',
  'snip.alertText': '메시지 내용',
  'snip.contents': '목차',
  'snip.mmdStart': '시작',
  'snip.mmdCondition': '조건',
  'snip.mmdYes': '예',
  'snip.mmdNo': '아니요',
  'snip.mmdResult': '결과',
  'snip.mmdOther': '다른 경로',

  'md.note': '참고',
  'md.tip': '팁',
  'md.important': '중요',
  'md.warning': '경고',
  'md.caution': '주의',
  'md.frontMatter': '프런트 매터',
  'media.image': '이미지',
  'media.audio': '오디오',
  'media.video': '동영상',
  'pv.link': '링크',
  'pv.embed': '포함된 페이지',
  'pv.embedReason': '제3자 페이지와 플레이어를 포함하는 기능은 지원되지 않습니다',
  'pv.embedTitle': '포함된 페이지는 지원되지 않습니다',
  'pv.badgeDanger': '차단됨(간단한 검사):',
  'pv.badgeWarn': '의심(간단한 검사):',
  'pv.empty': '빈 참조',
  'pv.dangerSource': '위험한 출처를 차단했습니다',
  'pv.blockedImage': '외부 이미지가 차단되었습니다 — "{hint}"을(를) 켜세요',
  'pv.blockedMedia': '외부 오디오/동영상이 차단되었습니다 — "{hint}"을(를) 켜세요',
  'pv.localMissing': '로컬 파일을 찾을 수 없습니다: {path}',
  'pv.localMissingHint': '문서와 함께 놓거나 폴더 전체를 놓으세요',
  'pv.fileBlocked': '"{name}" 파일이 차단되었습니다',
  'pv.noSource': '미디어 출처가 없습니다',
  'pv.openDoc': '{path} 문서 열기',
  'pv.localLink': '로컬 파일 "{path}"이(가) 열려 있지 않습니다 — 문서와 함께 놓으세요',
  'pv.linkBlocked': '링크가 차단되었습니다: {url}',
  'pv.linksDisabled': '링크가 비활성화되어 있습니다(완전 보호): {url}\n링크를 따라가려면 "{hint}"을(를) 켜세요.',
  'pv.diagram': '다이어그램',
  'pv.diagramError': '다이어그램 오류: {error}',

  'url.bidi': '주소에 보이지 않는 텍스트 방향 문자가 있습니다 — 파일 이름을 위장하는 수법입니다',
  'url.control': '주소에 제어 문자가 있습니다 — 필터를 우회하는 수법입니다',
  'url.data': '이 유형의 포함된 데이터(data:)에는 실행 코드가 들어 있을 수 있습니다',
  'url.invalid': '잘못된 주소',
  'url.scheme': '허용되지 않는 주소 유형 "{scheme}:" — 코드를 실행하거나 로컬 파일을 열 수 있습니다',
  'url.credentials': '주소에 사용자 이름 또는 비밀번호(user@host)가 숨겨져 있습니다 — 전형적인 피싱 수법으로, 실제 사이트는 "@" 뒤에 있습니다',
  'url.localLink': '로컬 네트워크 주소(공유기, NAS, localhost)',
  'url.localMedia': '로컬 네트워크에서 불러오는 것은 금지되어 있습니다: 문서가 네트워크의 기기를 탐색할 수 있습니다',
  'url.ip': '도메인 이름 대신 IP 주소',
  'url.unknownTld': '알 수 없는 최상위 도메인 ".{tld}"',
  'url.scamTld': '".{tld}" 도메인은 사기에 자주 사용됩니다',
  'url.mixed': '"{host}" 도메인은 여러 문자 체계를 섞어 씁니다 — 유명 사이트를 사칭할 수 있습니다',
  'url.idn': '국제화 도메인 "{host}" — 비슷한 주소를 사칭한 것이 아닌지 확인하세요',
  'url.shortener': '단축 URL — 실제 목적지가 숨겨져 있습니다',
  'url.subdomains': '하위 도메인이 너무 많습니다 — 실제 주소를 위장하는 수법입니다',
  'url.port': '비표준 포트 {port}',
  'url.http': '암호화되지 않은 연결(http://) — 전송 중에 내용이 변조될 수 있습니다',
  'url.doubleExt': '이중 확장자 "{name}" — 문서로 위장한 실행 파일입니다',
  'url.executable': '실행 파일 또는 매크로가 포함된 문서를 가리킵니다(.{ext})',
  'url.long': '매우 긴 주소',
  'url.encoded': '과도하게 인코딩된 주소 — 내용을 숨기고 있을 수 있습니다',
  'url.textMismatch': '링크 텍스트에는 "{shown}"이(가) 표시되지만 실제로는 "{host}"(으)로 연결됩니다',

  'filecheck.disguised': '"{name}" 파일은 미디어처럼 보이지만 실제로는 {what}입니다',
  'filecheck.unknown': '내용으로 "{name}"의 형식을 확인할 수 없습니다',
  'filecheck.mismatch': '"{name}"의 확장자가 내용과 일치하지 않습니다({detected})',
  'filecheck.svgActive': 'SVG "{name}"에 활성 콘텐츠(스크립트 또는 포함된 HTML)가 있습니다. 브라우저가 이를 실행하지 않는 일반 이미지로 표시됩니다',
  'what.exe': 'Windows 실행 파일',
  'what.elf': 'Linux 실행 파일',
  'what.macho': 'macOS 실행 파일',
  'what.script': '스크립트',
  'what.html': '웹 페이지',
  'what.zip': 'ZIP 압축 파일(또는 Office 문서)',
  'what.rar': 'RAR 압축 파일',
  'what.7z': '7z 압축 파일',
  'what.ole': '이전 형식의 Office 문서(매크로 포함 가능)',
  'what.pdf': 'PDF 문서',

  'sample.name': '환영합니다.md',
  'sample.body': `# Markdown Preview Editor

*브라우저 안에서만* 작동하는 미리 보기 기능이 있는 **Markdown** 편집기입니다.
문서는 어디로도 전송되지 않습니다. 이 사이트에도, 다른 누구에게도요.

> [!TIP]
> \`.md\` 파일, 여러 파일 또는 폴더 전체를 **창의 왼쪽 절반**에 놓으면 탭으로 열립니다.
> 문서와 함께 놓은 이미지는 자동으로 연결됩니다.

## 기능

- [x] 실시간 미리 보기와 스크롤 동기화
- [x] 표, 할 일 목록, 각주[^1], ==강조 표시==, H~2~O와 x^2^
- [x] 코드 강조, 수식, 다이어그램
- [ ] 데이터를 어딘가로 보내기 — **절대 없음**

| 모드 | 외부 링크 | 외부 이미지 |
| :--- | :---: | :---: |
| 완전 보호 | 비활성 | 불러오지 않음 |
| 권한 허용 | 검사함 | 검사함 |

## 코드

\`\`\`typescript
function greet(name: string): string {
  return \`안녕하세요, \${name}님!\`;
}
\`\`\`

## 수식

오일러 항등식: $e^{i\\pi} + 1 = 0$

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}
$$

## 다이어그램

\`\`\`mermaid
flowchart LR
    A[.md 파일] --> B(브라우저)
    B --> C{외부 리소스?}
    C -->|완전 보호| D[차단됨]
    C -->|허용됨| E[위협 검사]
\`\`\`

## 보호 기능 실제 동작

이 이미지는 외부 서버에 있으므로 *완전 보호* 모드에서는 불러오지 않습니다:

![외부 이미지](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)

이 링크는 "링크 허용"을 켤 때까지 비활성 상태입니다: [CommonMark](https://commonmark.org/).

그리고 이 링크는 의심스럽습니다. 텍스트에 표시된 주소와 실제 연결되는 주소가 다릅니다: [https://bank.example.com](https://bank-example.xyz/login).

---

단축키: <kbd>Ctrl</kbd>+<kbd>B</kbd> 굵게, <kbd>Ctrl</kbd>+<kbd>I</kbd> 기울임꼴, <kbd>Ctrl</kbd>+<kbd>K</kbd> 링크, <kbd>Ctrl</kbd>+<kbd>S</kbd> 저장, <kbd>Ctrl</kbd>+<kbd>O</kbd> 열기, <kbd>Ctrl</kbd>+<kbd>F</kbd> 찾기.

[^1]: 각주는 이렇게 표시됩니다.
`,
};

export default ko;
