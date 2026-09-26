import type { Messages } from '../index';

const de: Messages = {
  'app.framed': 'Diese Website kann nicht innerhalb einer anderen Seite geöffnet werden.',

  'header.viewMode': 'Ansicht',
  'view.editor': 'Editor',
  'view.split': 'Geteilt',
  'view.preview': 'Vorschau',
  'theme.toggle': 'Design wechseln',
  'theme.light': 'Helles Design',
  'theme.dark': 'Dunkles Design',
  'settings.title': 'Einstellungen',
  'file.open': 'Öffnen',
  'file.openTitle': 'Dateien öffnen (Strg+O)',
  'file.folder': 'Ordner',
  'file.folderTitle': 'Ordner mit Dokumenten und Bildern öffnen',
  'file.save': 'Speichern',
  'file.saveTitle': '.md speichern (Strg+S)',
  'file.html': 'HTML',
  'file.htmlTitle': 'Als eigenständige HTML-Datei exportieren',
  'file.print': 'Drucken',
  'file.printTitle': 'Drucken oder als PDF speichern',
  'menu.title': 'Menü',
  'menu.folder': 'Ordner öffnen',
  'menu.save': 'Als .md speichern',
  'menu.html': 'Als HTML exportieren',
  'menu.print': 'Drucken / als PDF speichern',

  'pane.editor': 'Editor',
  'pane.preview': 'Vorschau',
  'pane.resize': 'Bereichsgröße ändern',
  'toolbar.formatting': 'Formatierung',
  'drop.title': 'Zum Öffnen loslassen',
  'drop.hint1': '.md, .txt, Bilder, Audio, Video oder ein ganzer Ordner.',
  'drop.hint2': 'Dateien werden nur in Ihrem Browser gelesen und nie hochgeladen.',
  'drop.wrongPlace': 'Dateien auf den Editor ziehen (linke Fensterhälfte)',

  'prot.panel': 'Schutz',
  'prot.full': 'Vollständiger Schutz',
  'prot.fullDesc': 'Das Dokument hat keinen Netzwerkzugriff: Externe Links sind inaktiv, externe Bilder, Audio- und Videodateien werden nicht geladen.',
  'prot.permissions': 'Berechtigungen',
  'prot.links': 'Links erlauben',
  'prot.linksDesc': 'Öffnen sich in einem neuen Tab, ohne die Adresse dieser Seite preiszugeben. Verdächtige erst nach Bestätigung.',
  'prot.images': 'Externe Bilder erlauben',
  'prot.imagesDesc': 'Der Bildserver erfährt Ihre IP-Adresse und wann Sie das Dokument geöffnet haben.',
  'prot.media': 'Externes Audio und Video erlauben',
  'prot.mediaDesc': 'Standard-Player-Steuerung, niemals automatische Wiedergabe.',
  'prot.checkTitle': 'Einfache Bedrohungsprüfung.',
  'prot.checkText': 'Links und Medien werden zusätzlich heuristisch geprüft: Phishing-Tricks, gefälschte Domains, ausführbare Dateien, Adressen im lokalen Netzwerk. Gefährliches wird immer blockiert. Dies ist kein Virenscanner.',
  'prot.localNote': 'Bilder und Medien, die zusammen mit einem Dokument abgelegt werden, werden immer angezeigt – sie brauchen kein Netzwerk. Berechtigungen werden beim Neuladen der Seite zurückgesetzt.',
  'prot.relaxed': 'Schutz gelockert',
  'prot.fullTooltip': 'Vollständiger Schutz: Das Dokument hat keinen Netzwerkzugriff',
  'prot.allowed': 'Erlaubt: {list}',
  'prot.listLinks': 'Links',
  'prot.listImages': 'Bilder',
  'prot.listMedia': 'Audio und Video',
  'prot.enableHint': 'Um den Schutz zu lockern, aktivieren Sie unten eine der Berechtigungen',

  'settings.language': 'Sprache',
  'settings.languageAuto': 'Browsersprache',
  'settings.sync': 'Synchrones Scrollen',
  'settings.remember': 'Dokumente in diesem Browser merken',
  'settings.rememberOn': 'An: Der Text geöffneter Dokumente wird in diesem Browser gespeichert (ohne Bilder). Auf gemeinsam genutzten Computern ausschalten.',
  'settings.rememberOff': 'Aus: Beim Schließen des Browser-Tabs wird alles gelöscht. Nur auf Ihrem persönlichen Computer einschalten.',
  'settings.clear': 'Alles löschen',
  'settings.clearNote': 'Schließt alle Dokumente und entfernt sie aus dem Speicher und dem Browserspeicher.',
  'settings.privacy': 'Alle Dokumente werden ausschließlich in Ihrem Browser verarbeitet. Die Website enthält keine Analyse-Tools und kontaktiert keine Server Dritter.',

  'tab.untitled': 'Unbenannt {n}.md',
  'tab.close': 'Schließen',
  'tab.closeNamed': '{name} schließen',
  'tab.new': 'Neues Dokument',
  'dialog.cancel': 'Abbrechen',
  'dialog.close': 'Schließen',
  'close.title': 'Ohne Speichern schließen?',
  'close.body': '„{name}“ enthält ungespeicherte Änderungen. Sie gehen verloren.',
  'clear.title': 'Alles löschen?',
  'clear.body': 'Alle geöffneten Dokumente werden geschlossen und aus dem Speicher und dem Browserspeicher entfernt. Ungespeicherte Änderungen gehen verloren.',
  'clear.ok': 'Löschen',
  'clear.done': 'Alles gelöscht',

  'status.counts': 'Wörter: {words} · Zeichen: {chars} · Zeilen: {lines} · ~{minutes} Min. Lesezeit',
  'status.blocked': 'Durch Schutz blockiert: {n}',
  'status.dangers': 'Gefährlich: {n}',
  'status.warnings': 'Verdächtig: {n}',
  'status.missing': 'Fehlende Dateien: {n}',
  'status.details': 'Details anzeigen',
  'status.private': 'Nur in Ihrem Browser',
  'status.privateTitle': 'Dokumente verlassen niemals Ihren Browser: Die Website hat keinen Server, der sie empfangen könnte, und Netzwerkanfragen sind durch ihre Sicherheitsrichtlinie verboten.',

  'issues.title': 'Externe Ressourcen und Bedrohungsprüfung',
  'issues.danger': 'Gefährlich – blockiert',
  'issues.warn': 'Verdächtig',
  'issues.blocked': 'Durch den Schutzmodus blockiert',
  'issues.missing': 'Lokale Datei nicht gefunden',
  'issues.unsupported': 'Nicht unterstützt',
  'issues.note': 'Dies ist eine einfache Prüfung: Heuristiken, die im Browser laufen, ohne Adressen an Online-Dienste zu senden. Sie ersetzt keinen Virenscanner.',

  'link.title': 'Verdächtiger Link',
  'link.found': 'Die einfache Prüfung hat Warnzeichen gefunden:',
  'link.address': 'Adresse:',
  'link.note': 'Dies ist eine Heuristik, kein Virenscanner. Öffnen Sie den Link nur, wenn Sie der Quelle vertrauen.',
  'link.open': 'Trotzdem öffnen',

  'files.opened': 'Geöffnete Dokumente: {n}',
  'files.media': 'Mediendateien: {n}',
  'files.skipped': 'übersprungen: {n} ({names})',
  'files.readError': 'Die Dateien konnten nicht gelesen werden: {error}',
  'files.tooLarge': 'Die Datei „{name}“ ist zu groß (über 20 MB)',
  'files.notText': 'Die Datei „{name}“ scheint keine Textdatei zu sein',
  'save.done': 'Gespeichert: {name} (im Download-Ordner des Browsers)',
  'export.done': 'Exportiert: {name}',
  'render.error': 'Darstellungsfehler: {error}',

  'editor.placeholder': 'Markdown schreiben oder Dateien hierher ziehen…',
  'editor.aria': 'Markdown-Editor',
  'preview.frameTitle': 'Dokumentvorschau',

  'tb.undo': 'Rückgängig (Strg+Z)',
  'tb.redo': 'Wiederholen (Strg+Y)',
  'tb.heading': 'Überschrift',
  'tb.normal': 'Normaler Text',
  'tb.headingN': 'Überschrift {n}',
  'tb.bold': 'Fett (Strg+B)',
  'tb.italic': 'Kursiv (Strg+I)',
  'tb.strike': 'Durchgestrichen',
  'tb.link': 'Link (Strg+K)',
  'tb.image': 'Bild',
  'tb.bullets': 'Aufzählung',
  'tb.numbers': 'Nummerierte Liste',
  'tb.tasks': 'Aufgabenliste',
  'tb.quote': 'Zitat',
  'tb.code': 'Inline-Code',
  'tb.codeBlock': 'Codeblock',
  'tb.table': 'Tabelle',
  'tb.rule': 'Horizontale Linie',
  'tb.advanced': 'Erweiterter Editor',
  'tb.headings46': 'Überschriften 4–6',
  'tb.highlight': 'Hervorheben ==Text==',
  'tb.sup': 'Hochgestellt x^2^',
  'tb.sub': 'Tiefgestellt H~2~O',
  'tb.kbd': 'Taste <kbd>',
  'tb.footnote': 'Fußnote',
  'tb.details': 'Ausklappbarer Abschnitt (Spoiler)',
  'tb.alert': 'Hinweisblock',
  'tb.alertNote': 'Hinweis',
  'tb.alertTip': 'Tipp',
  'tb.alertImportant': 'Wichtig',
  'tb.alertWarning': 'Warnung',
  'tb.alertCaution': 'Vorsicht',
  'tb.math': 'Mathematische Formel',
  'tb.mermaid': 'Mermaid-Diagramm',
  'tb.toc': 'Inhaltsverzeichnis',
  'tb.tocEmpty': 'Das Dokument enthält keine Überschriften für ein Inhaltsverzeichnis',
  'tb.indent': 'Einzug vergrößern',
  'tb.outdent': 'Einzug verkleinern',
  'tb.find': 'Suchen und ersetzen (Strg+F)',
  'tb.lineNumbers': 'Zeilennummern',
  'tb.wrap': 'Zeilenumbruch',

  'snip.text': 'Text',
  'snip.description': 'Beschreibung',
  'snip.linkText': 'Linktext',
  'snip.column': 'Spalte {n}',
  'snip.cell': 'Zelle',
  'snip.code': 'Code',
  'snip.detailsTitle': 'Titel',
  'snip.detailsBody': 'Verborgener Inhalt',
  'snip.alertText': 'Nachrichtentext',
  'snip.contents': 'Inhalt',
  'snip.mmdStart': 'Start',
  'snip.mmdCondition': 'Bedingung',
  'snip.mmdYes': 'Ja',
  'snip.mmdNo': 'Nein',
  'snip.mmdResult': 'Ergebnis',
  'snip.mmdOther': 'Anderer Weg',

  'md.note': 'Hinweis',
  'md.tip': 'Tipp',
  'md.important': 'Wichtig',
  'md.warning': 'Warnung',
  'md.caution': 'Vorsicht',
  'md.frontMatter': 'Front Matter',
  'media.image': 'Bild',
  'media.audio': 'Audio',
  'media.video': 'Video',
  'pv.link': 'Link',
  'pv.embed': 'eingebettete Seite',
  'pv.embedReason': 'Das Einbetten fremder Seiten und Player wird nicht unterstützt',
  'pv.embedTitle': 'Eingebettete Seite wird nicht unterstützt',
  'pv.badgeDanger': 'Blockiert (einfache Prüfung):',
  'pv.badgeWarn': 'Verdächtig (einfache Prüfung):',
  'pv.empty': 'Leerer Verweis',
  'pv.dangerSource': 'Gefährliche Quelle blockiert',
  'pv.blockedImage': 'Externes Bild blockiert – aktivieren Sie „{hint}“',
  'pv.blockedMedia': 'Externes Audio/Video blockiert – aktivieren Sie „{hint}“',
  'pv.localMissing': 'Lokale Datei nicht gefunden: {path}',
  'pv.localMissingHint': 'Ziehen Sie sie zusammen mit dem Dokument hierher oder den ganzen Ordner',
  'pv.fileBlocked': 'Datei „{name}“ blockiert',
  'pv.noSource': 'Keine Medienquelle',
  'pv.openDoc': 'Dokument {path} öffnen',
  'pv.localLink': 'Die lokale Datei „{path}“ ist nicht geöffnet – ziehen Sie sie zusammen mit dem Dokument hierher',
  'pv.linkBlocked': 'Link blockiert: {url}',
  'pv.linksDisabled': 'Links sind deaktiviert (vollständiger Schutz): {url}\nAktivieren Sie „{hint}“, um ihnen zu folgen.',
  'pv.diagram': 'Diagramm',
  'pv.diagramError': 'Fehler im Diagramm: {error}',

  'url.bidi': 'Die Adresse enthält unsichtbare Zeichen zur Textrichtung – ein Trick, um Dateinamen zu verschleiern',
  'url.control': 'Die Adresse enthält Steuerzeichen – ein Trick, um Filter zu umgehen',
  'url.data': 'Eingebettete Daten (data:) dieses Typs können ausführbaren Code enthalten',
  'url.invalid': 'Ungültige Adresse',
  'url.scheme': 'Unzulässiger Adresstyp „{scheme}:“ – er kann Code ausführen oder lokale Dateien öffnen',
  'url.credentials': 'Die Adresse versteckt Benutzername/Passwort (user@host) – ein klassischer Phishing-Trick: Die echte Website steht nach dem „@“',
  'url.localLink': 'Adresse im lokalen Netzwerk (Router, NAS, localhost)',
  'url.localMedia': 'Laden aus dem lokalen Netzwerk ist verboten: Das Dokument könnte Geräte in Ihrem Netzwerk abtasten',
  'url.ip': 'IP-Adresse statt Domainname',
  'url.unknownTld': 'Unbekannte Top-Level-Domain „.{tld}“',
  'url.scamTld': 'Die Domain „.{tld}“ wird häufig für Betrug genutzt',
  'url.mixed': 'Die Domain „{host}“ mischt Alphabete – möglicherweise eine Imitation einer bekannten Website',
  'url.idn': 'Internationalisierte Domain „{host}“ – prüfen Sie, dass sie keine ähnlich aussehende Adresse imitiert',
  'url.shortener': 'Linkverkürzer – das eigentliche Ziel ist verborgen',
  'url.subdomains': 'Zu viele Subdomains – ein Trick, um die echte Adresse zu verschleiern',
  'url.port': 'Nicht standardmäßiger Port {port}',
  'url.http': 'Unverschlüsselte Verbindung (http://) – Inhalte können unterwegs verändert werden',
  'url.doubleExt': 'Doppelte Dateiendung „{name}“ – eine ausführbare Datei, getarnt als Dokument',
  'url.executable': 'Verweist auf eine ausführbare Datei oder ein Dokument mit Makros (.{ext})',
  'url.long': 'Sehr lange Adresse',
  'url.encoded': 'Stark kodierte Adresse – verbirgt möglicherweise ihren Inhalt',
  'url.textMismatch': 'Der Linktext zeigt „{shown}“, führt aber zu „{host}“',

  'filecheck.disguised': 'Die Datei „{name}“ gibt sich als Mediendatei aus, ist aber tatsächlich {what}',
  'filecheck.unknown': 'Das Format von „{name}“ konnte anhand des Inhalts nicht erkannt werden',
  'filecheck.mismatch': 'Die Endung von „{name}“ passt nicht zum Inhalt ({detected})',
  'filecheck.svgActive': 'Das SVG „{name}“ enthält aktive Inhalte (Skripte oder eingebettetes HTML). Es wird als normales Bild angezeigt, in dem der Browser sie nie ausführt',
  'what.exe': 'eine ausführbare Windows-Datei',
  'what.elf': 'eine ausführbare Linux-Datei',
  'what.macho': 'eine ausführbare macOS-Datei',
  'what.script': 'ein Skript',
  'what.html': 'eine Webseite',
  'what.zip': 'ein ZIP-Archiv (oder Office-Dokument)',
  'what.rar': 'ein RAR-Archiv',
  'what.7z': 'ein 7z-Archiv',
  'what.ole': 'ein älteres Office-Dokument (kann Makros enthalten)',
  'what.pdf': 'ein PDF-Dokument',

  'sample.name': 'Willkommen.md',
  'sample.body': `# Markdown Preview Editor

Ein **Markdown**-Editor mit Vorschau, der *ausschließlich in Ihrem Browser* arbeitet.
Dokumente werden nirgendwohin gesendet – weder an diese Website noch an sonst jemanden.

> [!TIP]
> Ziehen Sie eine \`.md\`-Datei, mehrere Dateien oder einen ganzen Ordner auf die **linke Fensterhälfte** – sie öffnen sich in Tabs.
> Bilder, die zusammen mit einem Dokument abgelegt werden, werden automatisch eingebunden.

## Funktionen

- [x] Live-Vorschau und synchrones Scrollen
- [x] Tabellen, Aufgabenlisten, Fußnoten[^1], ==Hervorhebungen==, H~2~O und x^2^
- [x] Syntaxhervorhebung, Formeln und Diagramme
- [ ] Ihre Daten irgendwohin senden – **niemals**

| Modus | Externe Links | Externe Bilder |
| :--- | :---: | :---: |
| Vollständiger Schutz | inaktiv | nicht geladen |
| Mit Berechtigungen | geprüft | geprüft |

## Code

\`\`\`typescript
function greet(name: string): string {
  return \`Hallo, \${name}!\`;
}
\`\`\`

## Formeln

Eulersche Identität: $e^{i\\pi} + 1 = 0$

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}
$$

## Diagramme

\`\`\`mermaid
flowchart LR
    A[.md-Datei] --> B(Browser)
    B --> C{Externe Ressourcen?}
    C -->|Vollständiger Schutz| D[Blockiert]
    C -->|Erlaubt| E[Bedrohungsprüfung]
\`\`\`

## Schutz in Aktion

Dieses Bild liegt auf einem externen Server und wird im Modus *Vollständiger Schutz* daher nicht geladen:

![Externes Bild](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)

Dieser Link bleibt inaktiv, bis „Links erlauben“ aktiviert ist: [CommonMark](https://commonmark.org/).

Und dieser Link ist verdächtig – sein Text zeigt eine Adresse, er führt aber zu einer anderen: [https://bank.example.com](https://bank-example.xyz/login).

---

Tastenkürzel: <kbd>Strg</kbd>+<kbd>B</kbd> fett, <kbd>Strg</kbd>+<kbd>I</kbd> kursiv, <kbd>Strg</kbd>+<kbd>K</kbd> Link, <kbd>Strg</kbd>+<kbd>S</kbd> speichern, <kbd>Strg</kbd>+<kbd>O</kbd> öffnen, <kbd>Strg</kbd>+<kbd>F</kbd> suchen.

[^1]: So sieht eine Fußnote aus.
`,
};

export default de;
