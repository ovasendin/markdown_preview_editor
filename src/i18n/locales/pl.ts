import type { Messages } from '../index';

const pl: Messages = {
  'app.framed': 'Tej strony nie można otworzyć wewnątrz innej strony.',

  'header.viewMode': 'Tryb widoku',
  'view.editor': 'Edytor',
  'view.split': 'Podział',
  'view.preview': 'Podgląd',
  'theme.toggle': 'Zmień motyw',
  'theme.light': 'Jasny motyw',
  'theme.dark': 'Ciemny motyw',
  'settings.title': 'Ustawienia',
  'file.open': 'Otwórz',
  'file.openTitle': 'Otwórz pliki (Ctrl+O)',
  'file.folder': 'Folder',
  'file.folderTitle': 'Otwórz folder z dokumentami i obrazami',
  'file.save': 'Zapisz',
  'file.saveTitle': 'Zapisz .md (Ctrl+S)',
  'file.html': 'HTML',
  'file.htmlTitle': 'Eksportuj do samodzielnego pliku HTML',
  'file.print': 'Drukuj',
  'file.printTitle': 'Drukuj lub zapisz jako PDF',
  'menu.title': 'Menu',
  'menu.folder': 'Otwórz folder',
  'menu.save': 'Zapisz jako .md',
  'menu.html': 'Eksportuj do HTML',
  'menu.print': 'Drukuj / zapisz jako PDF',

  'pane.editor': 'Edytor',
  'pane.preview': 'Podgląd',
  'pane.resize': 'Zmień rozmiar paneli',
  'toolbar.formatting': 'Formatowanie',
  'drop.title': 'Upuść, aby otworzyć',
  'drop.hint1': '.md, .txt, obrazy, audio, wideo lub cały folder.',
  'drop.hint2': 'Pliki są odczytywane tylko w Twojej przeglądarce i nigdy nie są wysyłane.',
  'drop.wrongPlace': 'Upuść pliki na edytor (lewa część okna)',

  'prot.panel': 'Ochrona',
  'prot.full': 'Pełna ochrona',
  'prot.fullDesc': 'Dokument nie ma dostępu do sieci: linki zewnętrzne są nieaktywne, a zewnętrzne obrazy, audio i wideo nie są wczytywane.',
  'prot.permissions': 'Uprawnienia',
  'prot.links': 'Zezwalaj na linki',
  'prot.linksDesc': 'Otwierają się w nowej karcie bez ujawniania adresu tej strony. Podejrzane — dopiero po potwierdzeniu.',
  'prot.images': 'Zezwalaj na zewnętrzne obrazy',
  'prot.imagesDesc': 'Serwer obrazu pozna Twój adres IP i czas otwarcia dokumentu.',
  'prot.media': 'Zezwalaj na zewnętrzne audio i wideo',
  'prot.mediaDesc': 'Standardowe przyciski odtwarzacza, nigdy autoodtwarzanie.',
  'prot.checkTitle': 'Lekka kontrola zagrożeń.',
  'prot.checkText': 'Linki i multimedia są dodatkowo sprawdzane heurystykami: sztuczki phishingowe, podrobione domeny, pliki wykonywalne, adresy w sieci lokalnej. Niebezpieczne elementy są zawsze blokowane. To nie jest program antywirusowy.',
  'prot.localNote': 'Obrazy i multimedia upuszczone razem z dokumentem są zawsze wyświetlane — nie potrzebują sieci. Uprawnienia są resetowane po przeładowaniu strony.',
  'prot.relaxed': 'Ochrona obniżona',
  'prot.fullTooltip': 'Pełna ochrona: dokument nie ma dostępu do sieci',
  'prot.allowed': 'Dozwolone: {list}',
  'prot.listLinks': 'linki',
  'prot.listImages': 'obrazy',
  'prot.listMedia': 'audio i wideo',
  'prot.enableHint': 'Aby obniżyć ochronę, włącz jedno z uprawnień poniżej',

  'settings.language': 'Język',
  'settings.languageAuto': 'Język przeglądarki',
  'settings.sync': 'Synchroniczne przewijanie',
  'settings.remember': 'Zapamiętuj dokumenty w tej przeglądarce',
  'settings.rememberOn': 'Włączone: tekst otwartych dokumentów jest przechowywany w tej przeglądarce (bez obrazów). Wyłącz na współdzielonych komputerach.',
  'settings.rememberOff': 'Wyłączone: zamknięcie karty przeglądarki usuwa wszystko. Włącz tylko na swoim prywatnym komputerze.',
  'settings.clear': 'Wyczyść wszystko',
  'settings.clearNote': 'Zamyka wszystkie dokumenty i usuwa je z pamięci oraz z magazynu przeglądarki.',
  'settings.privacy': 'Wszystkie dokumenty są przetwarzane wyłącznie w Twojej przeglądarce. Strona nie zawiera analityki i nigdy nie łączy się z serwerami zewnętrznymi.',

  'tab.untitled': 'Bez tytułu {n}.md',
  'tab.close': 'Zamknij',
  'tab.closeNamed': 'Zamknij {name}',
  'tab.new': 'Nowy dokument',
  'dialog.cancel': 'Anuluj',
  'dialog.close': 'Zamknij',
  'close.title': 'Zamknąć bez zapisywania?',
  'close.body': '„{name}” ma niezapisane zmiany. Zostaną utracone.',
  'clear.title': 'Wyczyścić wszystko?',
  'clear.body': 'Wszystkie otwarte dokumenty zostaną zamknięte i usunięte z pamięci oraz z magazynu przeglądarki. Niezapisane zmiany zostaną utracone.',
  'clear.ok': 'Wyczyść',
  'clear.done': 'Wszystko wyczyszczone',

  'status.counts': 'Słowa: {words} · Znaki: {chars} · Wiersze: {lines} · ~{minutes} min czytania',
  'status.blocked': 'Zablokowane przez ochronę: {n}',
  'status.dangers': 'Niebezpieczne: {n}',
  'status.warnings': 'Podejrzane: {n}',
  'status.missing': 'Brakujące pliki: {n}',
  'status.details': 'Pokaż szczegóły',
  'status.private': 'Tylko w Twojej przeglądarce',
  'status.privateTitle': 'Dokumenty nigdy nie opuszczają Twojej przeglądarki: strona nie ma serwera, który mógłby je odebrać, a jej polityka bezpieczeństwa zabrania żądań sieciowych.',

  'issues.title': 'Zasoby zewnętrzne i kontrola zagrożeń',
  'issues.danger': 'Niebezpieczne — zablokowane',
  'issues.warn': 'Podejrzane',
  'issues.blocked': 'Zablokowane przez tryb ochrony',
  'issues.missing': 'Nie znaleziono pliku lokalnego',
  'issues.unsupported': 'Nieobsługiwane',
  'issues.note': 'To lekka kontrola: heurystyki działające w przeglądarce, bez wysyłania adresów do usług online. To nie jest program antywirusowy.',

  'link.title': 'Podejrzany link',
  'link.found': 'Lekka kontrola wykryła sygnały ostrzegawcze:',
  'link.address': 'Adres:',
  'link.note': 'To heurystyka, a nie program antywirusowy. Otwieraj tylko wtedy, gdy ufasz źródłu.',
  'link.open': 'Otwórz mimo to',

  'files.opened': 'Otwarte dokumenty: {n}',
  'files.media': 'pliki multimedialne: {n}',
  'files.skipped': 'pominięte: {n} ({names})',
  'files.readError': 'Nie udało się odczytać plików: {error}',
  'files.tooLarge': 'Plik „{name}” jest za duży (ponad 20 MB)',
  'files.notText': 'Plik „{name}” nie wygląda na plik tekstowy',
  'save.done': 'Zapisano: {name} (w folderze pobranych plików przeglądarki)',
  'export.done': 'Wyeksportowano: {name}',
  'render.error': 'Błąd wyświetlania: {error}',

  'editor.placeholder': 'Zacznij pisać w Markdown lub upuść tutaj pliki…',
  'editor.aria': 'Edytor Markdown',
  'preview.frameTitle': 'Podgląd dokumentu',

  'tb.undo': 'Cofnij (Ctrl+Z)',
  'tb.redo': 'Ponów (Ctrl+Y)',
  'tb.heading': 'Nagłówek',
  'tb.normal': 'Zwykły tekst',
  'tb.headingN': 'Nagłówek {n}',
  'tb.bold': 'Pogrubienie (Ctrl+B)',
  'tb.italic': 'Kursywa (Ctrl+I)',
  'tb.strike': 'Przekreślenie',
  'tb.link': 'Link (Ctrl+K)',
  'tb.image': 'Obraz',
  'tb.bullets': 'Lista punktowana',
  'tb.numbers': 'Lista numerowana',
  'tb.tasks': 'Lista zadań',
  'tb.quote': 'Cytat',
  'tb.code': 'Kod w tekście',
  'tb.codeBlock': 'Blok kodu',
  'tb.table': 'Tabela',
  'tb.rule': 'Linia pozioma',
  'tb.advanced': 'Edytor zaawansowany',
  'tb.headings46': 'Nagłówki 4–6',
  'tb.highlight': 'Wyróżnienie ==tekst==',
  'tb.sup': 'Indeks górny x^2^',
  'tb.sub': 'Indeks dolny H~2~O',
  'tb.kbd': 'Klawisz <kbd>',
  'tb.footnote': 'Przypis',
  'tb.details': 'Sekcja zwijana (spoiler)',
  'tb.alert': 'Ramka z ostrzeżeniem',
  'tb.alertNote': 'Uwaga',
  'tb.alertTip': 'Wskazówka',
  'tb.alertImportant': 'Ważne',
  'tb.alertWarning': 'Ostrzeżenie',
  'tb.alertCaution': 'Ostrożnie',
  'tb.math': 'Wzór matematyczny',
  'tb.mermaid': 'Diagram Mermaid',
  'tb.toc': 'Spis treści',
  'tb.tocEmpty': 'Dokument nie ma nagłówków, z których można utworzyć spis treści',
  'tb.indent': 'Zwiększ wcięcie',
  'tb.outdent': 'Zmniejsz wcięcie',
  'tb.find': 'Znajdź i zamień (Ctrl+F)',
  'tb.lineNumbers': 'Numery wierszy',
  'tb.wrap': 'Zawijanie wierszy',

  'snip.text': 'tekst',
  'snip.description': 'opis',
  'snip.linkText': 'tekst linku',
  'snip.column': 'Kolumna {n}',
  'snip.cell': 'komórka',
  'snip.code': 'kod',
  'snip.detailsTitle': 'Tytuł',
  'snip.detailsBody': 'Ukryta treść',
  'snip.alertText': 'Treść komunikatu',
  'snip.contents': 'Spis treści',
  'snip.mmdStart': 'Start',
  'snip.mmdCondition': 'Warunek',
  'snip.mmdYes': 'Tak',
  'snip.mmdNo': 'Nie',
  'snip.mmdResult': 'Wynik',
  'snip.mmdOther': 'Inna ścieżka',

  'md.note': 'Uwaga',
  'md.tip': 'Wskazówka',
  'md.important': 'Ważne',
  'md.warning': 'Ostrzeżenie',
  'md.caution': 'Ostrożnie',
  'md.frontMatter': 'Metadane (front matter)',
  'media.image': 'obraz',
  'media.audio': 'audio',
  'media.video': 'wideo',
  'pv.link': 'link',
  'pv.embed': 'osadzona strona',
  'pv.embedReason': 'Osadzanie stron i odtwarzaczy innych serwisów nie jest obsługiwane',
  'pv.embedTitle': 'Osadzona strona nie jest obsługiwana',
  'pv.badgeDanger': 'Zablokowane (lekka kontrola):',
  'pv.badgeWarn': 'Podejrzane (lekka kontrola):',
  'pv.empty': 'Puste odwołanie',
  'pv.dangerSource': 'Zablokowano niebezpieczne źródło',
  'pv.blockedImage': 'Zablokowano zewnętrzny obraz — włącz „{hint}”',
  'pv.blockedMedia': 'Zablokowano zewnętrzne audio lub wideo — włącz „{hint}”',
  'pv.localMissing': 'Nie znaleziono pliku lokalnego: {path}',
  'pv.localMissingHint': 'Upuść go razem z dokumentem albo upuść cały folder',
  'pv.fileBlocked': 'Zablokowano plik „{name}”',
  'pv.noSource': 'Brak źródła multimediów',
  'pv.openDoc': 'Otwórz dokument {path}',
  'pv.localLink': 'Plik lokalny „{path}” nie jest otwarty — upuść go razem z dokumentem',
  'pv.linkBlocked': 'Zablokowano link: {url}',
  'pv.linksDisabled': 'Linki są wyłączone (pełna ochrona): {url}\nWłącz „{hint}”, aby z nich korzystać.',
  'pv.diagram': 'Diagram',
  'pv.diagramError': 'Błąd w diagramie: {error}',

  'url.bidi': 'Adres zawiera niewidoczne znaki kierunku tekstu — sztuczka służąca do maskowania nazw plików',
  'url.control': 'Adres zawiera znaki sterujące — sztuczka służąca do omijania filtrów',
  'url.data': 'Osadzone dane (data:) tego typu mogą zawierać kod wykonywalny',
  'url.invalid': 'Nieprawidłowy adres',
  'url.scheme': 'Niedozwolony typ adresu „{scheme}:” — może uruchomić kod lub otworzyć pliki lokalne',
  'url.credentials': 'Adres ukrywa login lub hasło (user@host) — klasyczna sztuczka phishingowa: prawdziwa strona to część po „@”',
  'url.localLink': 'Adres w sieci lokalnej (router, NAS, localhost)',
  'url.localMedia': 'Wczytywanie z sieci lokalnej jest zabronione: dokument mógłby skanować urządzenia w Twojej sieci',
  'url.ip': 'Adres IP zamiast nazwy domeny',
  'url.unknownTld': 'Nieznana domena najwyższego poziomu „.{tld}”',
  'url.scamTld': 'Domena „.{tld}” jest często używana do oszustw',
  'url.mixed': 'Domena „{host}” łączy różne alfabety — może podszywać się pod znaną stronę',
  'url.idn': 'Domena z międzynarodowymi znakami „{host}” — sprawdź, czy nie podszywa się pod podobny adres',
  'url.shortener': 'Skracacz linków — prawdziwy cel jest ukryty',
  'url.subdomains': 'Zbyt wiele subdomen — sztuczka służąca do maskowania prawdziwego adresu',
  'url.port': 'Niestandardowy port {port}',
  'url.http': 'Połączenie nieszyfrowane (http://) — treść może zostać zmieniona po drodze',
  'url.doubleExt': 'Podwójne rozszerzenie „{name}” — plik wykonywalny udający dokument',
  'url.executable': 'Prowadzi do pliku wykonywalnego lub dokumentu z makrami (.{ext})',
  'url.long': 'Bardzo długi adres',
  'url.encoded': 'Mocno zakodowany adres — może ukrywać swoją treść',
  'url.textMismatch': 'Tekst linku pokazuje „{shown}”, ale link prowadzi do „{host}”',

  'filecheck.disguised': 'Plik „{name}” udaje plik multimedialny, ale w rzeczywistości jest to {what}',
  'filecheck.unknown': 'Nie udało się rozpoznać formatu pliku „{name}” na podstawie zawartości',
  'filecheck.mismatch': 'Rozszerzenie pliku „{name}” nie pasuje do zawartości ({detected})',
  'filecheck.svgActive': 'Plik SVG „{name}” zawiera aktywną treść (skrypty lub osadzony HTML). Jest wyświetlany jako zwykły obraz, w którym przeglądarka nigdy jej nie uruchamia',
  'what.exe': 'plik wykonywalny Windows',
  'what.elf': 'plik wykonywalny Linux',
  'what.macho': 'plik wykonywalny macOS',
  'what.script': 'skrypt',
  'what.html': 'strona internetowa',
  'what.zip': 'archiwum ZIP (lub dokument Office)',
  'what.rar': 'archiwum RAR',
  'what.7z': 'archiwum 7z',
  'what.ole': 'starszy dokument Office (może zawierać makra)',
  'what.pdf': 'dokument PDF',

  'sample.name': 'Witaj.md',
  'sample.body': `# Markdown Preview Editor

Edytor **Markdown** z podglądem, który działa *wyłącznie w Twojej przeglądarce*.
Dokumenty nigdy nie są nigdzie wysyłane — ani do tej strony, ani do nikogo innego.

> [!TIP]
> Upuść plik \`.md\`, kilka plików lub cały folder na **lewą połowę okna** — otworzą się w kartach.
> Obrazy upuszczone razem z dokumentem są dołączane automatycznie.

## Funkcje

- [x] Podgląd na żywo i synchroniczne przewijanie
- [x] Tabele, listy zadań, przypisy[^1], ==wyróżnienia==, H~2~O i x^2^
- [x] Podświetlanie kodu, wzory i diagramy
- [ ] Wysyłanie Twoich danych gdziekolwiek — **nigdy**

| Tryb | Linki zewnętrzne | Obrazy zewnętrzne |
| :--- | :---: | :---: |
| Pełna ochrona | nieaktywne | niewczytywane |
| Z uprawnieniami | sprawdzane | sprawdzane |

## Kod

\`\`\`typescript
function greet(name: string): string {
  return \`Cześć, \${name}!\`;
}
\`\`\`

## Wzory

Tożsamość Eulera: $e^{i\\pi} + 1 = 0$

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}
$$

## Diagramy

\`\`\`mermaid
flowchart LR
    A[Plik .md] --> B(Przeglądarka)
    B --> C{Zasoby zewnętrzne?}
    C -->|Pełna ochrona| D[Zablokowane]
    C -->|Dozwolone| E[Kontrola zagrożeń]
\`\`\`

## Ochrona w praktyce

Ten obraz znajduje się na zewnętrznym serwerze, dlatego w trybie *Pełna ochrona* nie jest wczytywany:

![Obraz zewnętrzny](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)

Ten link pozostaje nieaktywny, dopóki nie włączysz „Zezwalaj na linki”: [CommonMark](https://commonmark.org/).

A ten link jest podejrzany — jego tekst pokazuje jeden adres, a prowadzi do innego: [https://bank.example.com](https://bank-example.xyz/login).

---

Skróty: <kbd>Ctrl</kbd>+<kbd>B</kbd> pogrubienie, <kbd>Ctrl</kbd>+<kbd>I</kbd> kursywa, <kbd>Ctrl</kbd>+<kbd>K</kbd> link, <kbd>Ctrl</kbd>+<kbd>S</kbd> zapisz, <kbd>Ctrl</kbd>+<kbd>O</kbd> otwórz, <kbd>Ctrl</kbd>+<kbd>F</kbd> szukaj.

[^1]: Tak wygląda przypis.
`,
};

export default pl;
