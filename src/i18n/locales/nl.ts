import type { Messages } from '../index';

const nl: Messages = {
  'app.framed': 'Deze site kan niet binnen een andere pagina worden geopend.',

  'header.viewMode': 'Weergave',
  'view.editor': 'Editor',
  'view.split': 'Gesplitst',
  'view.preview': 'Voorbeeld',
  'theme.toggle': 'Thema wisselen',
  'theme.light': 'Licht thema',
  'theme.dark': 'Donker thema',
  'settings.title': 'Instellingen',
  'file.open': 'Openen',
  'file.openTitle': 'Bestanden openen (Ctrl+O)',
  'file.folder': 'Map',
  'file.folderTitle': 'Een map met documenten en afbeeldingen openen',
  'file.save': 'Opslaan',
  'file.saveTitle': '.md opslaan (Ctrl+S)',
  'file.html': 'HTML',
  'file.htmlTitle': 'Exporteren naar een zelfstandig HTML-bestand',
  'file.print': 'Afdrukken',
  'file.printTitle': 'Afdrukken of opslaan als pdf',
  'menu.title': 'Menu',
  'menu.folder': 'Map openen',
  'menu.save': 'Opslaan als .md',
  'menu.html': 'Exporteren naar HTML',
  'menu.print': 'Afdrukken / opslaan als pdf',

  'pane.editor': 'Editor',
  'pane.preview': 'Voorbeeld',
  'pane.resize': 'Grootte van panelen wijzigen',
  'toolbar.formatting': 'Opmaak',
  'drop.title': 'Loslaten om te openen',
  'drop.hint1': '.md, .txt, afbeeldingen, audio, video of een hele map.',
  'drop.hint2': 'Bestanden worden alleen in je browser gelezen en nooit geüpload.',
  'drop.wrongPlace': 'Sleep bestanden naar de editor (linkerkant van het venster)',

  'prot.panel': 'Bescherming',
  'prot.full': 'Volledige bescherming',
  'prot.fullDesc': 'Het document heeft geen toegang tot het netwerk: externe links zijn inactief; externe afbeeldingen, audio en video worden niet geladen.',
  'prot.permissions': 'Toestemmingen',
  'prot.links': 'Links toestaan',
  'prot.linksDesc': 'Openen in een nieuw tabblad zonder het adres van deze pagina prijs te geven. Verdachte links pas na bevestiging.',
  'prot.images': 'Externe afbeeldingen toestaan',
  'prot.imagesDesc': 'De server van de afbeelding ziet je IP-adres en wanneer je het document hebt geopend.',
  'prot.media': 'Externe audio en video toestaan',
  'prot.mediaDesc': 'Standaard spelerknoppen, nooit automatisch afspelen.',
  'prot.checkTitle': 'Lichte controle op dreigingen.',
  'prot.checkText': 'Links en media worden ook met heuristieken gecontroleerd: phishingtrucs, nagemaakte domeinen, uitvoerbare bestanden, adressen in het lokale netwerk. Gevaarlijke items worden altijd geblokkeerd. Dit is geen antivirusprogramma.',
  'prot.localNote': 'Afbeeldingen en media die samen met een document worden gesleept, worden altijd getoond: ze hebben geen netwerk nodig. Toestemmingen worden gewist wanneer de pagina opnieuw wordt geladen.',
  'prot.relaxed': 'Bescherming versoepeld',
  'prot.fullTooltip': 'Volledige bescherming: het document heeft geen toegang tot het netwerk',
  'prot.allowed': 'Toegestaan: {list}',
  'prot.listLinks': 'links',
  'prot.listImages': 'afbeeldingen',
  'prot.listMedia': 'audio en video',
  'prot.enableHint': 'Schakel hieronder een van de toestemmingen in om de bescherming te versoepelen',

  'settings.language': 'Taal',
  'settings.languageAuto': 'Browsertaal',
  'settings.sync': 'Gesynchroniseerd scrollen',
  'settings.remember': 'Documenten onthouden in deze browser',
  'settings.rememberOn': 'Aan: de tekst van geopende documenten wordt in deze browser bewaard (zonder afbeeldingen). Zet dit uit op gedeelde computers.',
  'settings.rememberOff': 'Uit: als je het browsertabblad sluit, wordt alles gewist. Zet dit alleen aan op je eigen computer.',
  'settings.clear': 'Alles wissen',
  'settings.clearNote': 'Sluit alle documenten en verwijdert ze uit het geheugen en de browseropslag.',
  'settings.privacy': 'Alle documenten worden alleen in je browser verwerkt. De site bevat geen analysetools en maakt nooit contact met servers van derden.',

  'tab.untitled': 'Naamloos {n}.md',
  'tab.close': 'Sluiten',
  'tab.closeNamed': '{name} sluiten',
  'tab.new': 'Nieuw document',
  'dialog.cancel': 'Annuleren',
  'dialog.close': 'Sluiten',
  'close.title': 'Sluiten zonder op te slaan?',
  'close.body': '"{name}" bevat niet-opgeslagen wijzigingen. Die gaan verloren.',
  'clear.title': 'Alles wissen?',
  'clear.body': 'Alle geopende documenten worden gesloten en verwijderd uit het geheugen en de browseropslag. Niet-opgeslagen wijzigingen gaan verloren.',
  'clear.ok': 'Wissen',
  'clear.done': 'Alles is gewist',

  'status.counts': 'Woorden: {words} · Tekens: {chars} · Regels: {lines} · ~{minutes} min lezen',
  'status.blocked': 'Geblokkeerd door bescherming: {n}',
  'status.dangers': 'Gevaarlijk: {n}',
  'status.warnings': 'Verdacht: {n}',
  'status.missing': 'Ontbrekende bestanden: {n}',
  'status.details': 'Details tonen',
  'status.private': 'Alleen in je browser',
  'status.privateTitle': 'Documenten verlaten nooit je browser: de site heeft geen server om ze te ontvangen en het beveiligingsbeleid verbiedt netwerkverzoeken.',

  'issues.title': 'Externe bronnen en controle op dreigingen',
  'issues.danger': 'Gevaarlijk — geblokkeerd',
  'issues.warn': 'Verdacht',
  'issues.blocked': 'Geblokkeerd door de beschermingsmodus',
  'issues.missing': 'Lokaal bestand niet gevonden',
  'issues.unsupported': 'Niet ondersteund',
  'issues.note': 'Dit is een lichte controle: heuristieken die in de browser draaien, zonder adressen naar een onlinedienst te sturen. Het is geen antivirusprogramma.',

  'link.title': 'Verdachte link',
  'link.found': 'De lichte controle vond waarschuwingssignalen:',
  'link.address': 'Adres:',
  'link.note': 'Dit is een heuristiek, geen antivirusprogramma. Open de link alleen als je de bron vertrouwt.',
  'link.open': 'Toch openen',

  'files.opened': 'Geopende documenten: {n}',
  'files.media': 'mediabestanden: {n}',
  'files.skipped': 'overgeslagen: {n} ({names})',
  'files.readError': 'De bestanden konden niet worden gelezen: {error}',
  'files.tooLarge': 'Het bestand "{name}" is te groot (meer dan 20 MB)',
  'files.notText': 'Het bestand "{name}" lijkt geen tekstbestand te zijn',
  'save.done': 'Opgeslagen: {name} (in de downloadmap van de browser)',
  'export.done': 'Geëxporteerd: {name}',
  'render.error': 'Weergavefout: {error}',

  'editor.placeholder': 'Begin met Markdown schrijven of sleep hier bestanden naartoe…',
  'editor.aria': 'Markdown-editor',
  'preview.frameTitle': 'Voorbeeld van het document',

  'tb.undo': 'Ongedaan maken (Ctrl+Z)',
  'tb.redo': 'Opnieuw (Ctrl+Y)',
  'tb.heading': 'Kop',
  'tb.normal': 'Normale tekst',
  'tb.headingN': 'Kop {n}',
  'tb.bold': 'Vet (Ctrl+B)',
  'tb.italic': 'Cursief (Ctrl+I)',
  'tb.strike': 'Doorhalen',
  'tb.link': 'Link (Ctrl+K)',
  'tb.image': 'Afbeelding',
  'tb.bullets': 'Opsommingslijst',
  'tb.numbers': 'Genummerde lijst',
  'tb.tasks': 'Takenlijst',
  'tb.quote': 'Citaat',
  'tb.code': 'Inline code',
  'tb.codeBlock': 'Codeblok',
  'tb.table': 'Tabel',
  'tb.rule': 'Horizontale lijn',
  'tb.advanced': 'Geavanceerde editor',
  'tb.headings46': 'Koppen 4–6',
  'tb.highlight': 'Markeren ==tekst==',
  'tb.sup': 'Superscript x^2^',
  'tb.sub': 'Subscript H~2~O',
  'tb.kbd': 'Toets <kbd>',
  'tb.footnote': 'Voetnoot',
  'tb.details': 'Uitklapbare sectie (spoiler)',
  'tb.alert': 'Meldingsblok',
  'tb.alertNote': 'Opmerking',
  'tb.alertTip': 'Tip',
  'tb.alertImportant': 'Belangrijk',
  'tb.alertWarning': 'Waarschuwing',
  'tb.alertCaution': 'Let op',
  'tb.math': 'Wiskundige formule',
  'tb.mermaid': 'Mermaid-diagram',
  'tb.toc': 'Inhoudsopgave',
  'tb.tocEmpty': 'Het document heeft geen koppen voor een inhoudsopgave',
  'tb.indent': 'Inspringing vergroten',
  'tb.outdent': 'Inspringing verkleinen',
  'tb.find': 'Zoeken en vervangen (Ctrl+F)',
  'tb.lineNumbers': 'Regelnummers',
  'tb.wrap': 'Regelterugloop',

  'snip.text': 'tekst',
  'snip.description': 'beschrijving',
  'snip.linkText': 'linktekst',
  'snip.column': 'Kolom {n}',
  'snip.cell': 'cel',
  'snip.code': 'code',
  'snip.detailsTitle': 'Titel',
  'snip.detailsBody': 'Verborgen inhoud',
  'snip.alertText': 'Berichttekst',
  'snip.contents': 'Inhoud',
  'snip.mmdStart': 'Start',
  'snip.mmdCondition': 'Voorwaarde',
  'snip.mmdYes': 'Ja',
  'snip.mmdNo': 'Nee',
  'snip.mmdResult': 'Resultaat',
  'snip.mmdOther': 'Andere route',

  'md.note': 'Opmerking',
  'md.tip': 'Tip',
  'md.important': 'Belangrijk',
  'md.warning': 'Waarschuwing',
  'md.caution': 'Let op',
  'md.frontMatter': 'Metadata (front matter)',
  'media.image': 'afbeelding',
  'media.audio': 'audio',
  'media.video': 'video',
  'pv.link': 'link',
  'pv.embed': 'ingesloten pagina',
  'pv.embedReason': 'Het insluiten van pagina’s en spelers van derden wordt niet ondersteund',
  'pv.embedTitle': 'Ingesloten pagina wordt niet ondersteund',
  'pv.badgeDanger': 'Geblokkeerd (lichte controle):',
  'pv.badgeWarn': 'Verdacht (lichte controle):',
  'pv.empty': 'Lege verwijzing',
  'pv.dangerSource': 'Gevaarlijke bron geblokkeerd',
  'pv.blockedImage': 'Externe afbeelding geblokkeerd — schakel "{hint}" in',
  'pv.blockedMedia': 'Externe audio of video geblokkeerd — schakel "{hint}" in',
  'pv.localMissing': 'Lokaal bestand niet gevonden: {path}',
  'pv.localMissingHint': 'Sleep het samen met het document, of sleep de hele map',
  'pv.fileBlocked': 'Bestand "{name}" geblokkeerd',
  'pv.noSource': 'Geen mediabron',
  'pv.openDoc': 'Document {path} openen',
  'pv.localLink': 'Het lokale bestand "{path}" is niet geopend — sleep het samen met het document',
  'pv.linkBlocked': 'Link geblokkeerd: {url}',
  'pv.linksDisabled': 'Links zijn uitgeschakeld (volledige bescherming): {url}\nSchakel "{hint}" in om ze te volgen.',
  'pv.diagram': 'Diagram',
  'pv.diagramError': 'Fout in diagram: {error}',

  'url.bidi': 'Het adres bevat onzichtbare tekens voor de tekstrichting — een truc om bestandsnamen te verhullen',
  'url.control': 'Het adres bevat stuurtekens — een truc om filters te omzeilen',
  'url.data': 'Ingesloten gegevens (data:) van dit type kunnen uitvoerbare code bevatten',
  'url.invalid': 'Ongeldig adres',
  'url.scheme': 'Niet-toegestaan adrestype "{scheme}:" — het kan code uitvoeren of lokale bestanden openen',
  'url.credentials': 'Het adres verbergt een gebruikersnaam of wachtwoord (user@host) — een klassieke phishingtruc: de echte site is het deel na de "@"',
  'url.localLink': 'Adres in het lokale netwerk (router, NAS, localhost)',
  'url.localMedia': 'Laden uit het lokale netwerk is verboden: het document zou apparaten in je netwerk kunnen aftasten',
  'url.ip': 'IP-adres in plaats van een domeinnaam',
  'url.unknownTld': 'Onbekend topleveldomein ".{tld}"',
  'url.scamTld': 'Het domein ".{tld}" wordt vaak gebruikt voor oplichting',
  'url.mixed': 'Het domein "{host}" mengt alfabetten — mogelijk een imitatie van een bekende site',
  'url.idn': 'Geïnternationaliseerd domein "{host}" — controleer of het geen imitatie van een vergelijkbaar adres is',
  'url.shortener': 'Linkverkorter — de echte bestemming is verborgen',
  'url.subdomains': 'Te veel subdomeinen — een truc om het echte adres te verhullen',
  'url.port': 'Niet-standaard poort {port}',
  'url.http': 'Onversleutelde verbinding (http://) — de inhoud kan onderweg worden gewijzigd',
  'url.doubleExt': 'Dubbele extensie "{name}" — een uitvoerbaar bestand vermomd als document',
  'url.executable': 'Verwijst naar een uitvoerbaar bestand of een document met macro’s (.{ext})',
  'url.long': 'Zeer lang adres',
  'url.encoded': 'Sterk gecodeerd adres — verbergt mogelijk de inhoud',
  'url.textMismatch': 'De linktekst toont "{shown}", maar leidt naar "{host}"',

  'filecheck.disguised': 'Het bestand "{name}" doet zich voor als media, maar is eigenlijk {what}',
  'filecheck.unknown': 'Het formaat van "{name}" kon niet aan de inhoud worden herkend',
  'filecheck.mismatch': 'De extensie van "{name}" komt niet overeen met de inhoud ({detected})',
  'filecheck.svgActive': 'De SVG "{name}" bevat actieve inhoud (scripts of ingesloten HTML). Hij wordt getoond als een gewone afbeelding, waarin de browser die nooit uitvoert',
  'what.exe': 'een uitvoerbaar Windows-bestand',
  'what.elf': 'een uitvoerbaar Linux-bestand',
  'what.macho': 'een uitvoerbaar macOS-bestand',
  'what.script': 'een script',
  'what.html': 'een webpagina',
  'what.zip': 'een ZIP-archief (of Office-document)',
  'what.rar': 'een RAR-archief',
  'what.7z': 'een 7z-archief',
  'what.ole': 'een ouder Office-document (kan macro’s bevatten)',
  'what.pdf': 'een pdf-document',

  'sample.name': 'Welkom.md',
  'sample.body': `# Markdown Preview Editor

Een **Markdown**-editor met voorbeeldweergave die *alleen in je browser* werkt.
Documenten worden nergens naartoe gestuurd — niet naar deze site en ook niet naar iemand anders.

> [!TIP]
> Sleep een \`.md\`-bestand, meerdere bestanden of een hele map naar de **linkerhelft van het venster** — ze openen in tabbladen.
> Afbeeldingen die je samen met een document sleept, worden automatisch gekoppeld.

## Functies

- [x] Live voorbeeld en gesynchroniseerd scrollen
- [x] Tabellen, takenlijsten, voetnoten[^1], ==markeringen==, H~2~O en x^2^
- [x] Codemarkering, formules en diagrammen
- [ ] Je gegevens ergens naartoe sturen — **nooit**

| Modus | Externe links | Externe afbeeldingen |
| :--- | :---: | :---: |
| Volledige bescherming | inactief | niet geladen |
| Met toestemmingen | gecontroleerd | gecontroleerd |

## Code

\`\`\`typescript
function greet(name: string): string {
  return \`Hallo, \${name}!\`;
}
\`\`\`

## Formules

Identiteit van Euler: $e^{i\\pi} + 1 = 0$

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}
$$

## Diagrammen

\`\`\`mermaid
flowchart LR
    A[.md-bestand] --> B(Browser)
    B --> C{Externe bronnen?}
    C -->|Volledige bescherming| D[Geblokkeerd]
    C -->|Toegestaan| E[Controle op dreigingen]
\`\`\`

## Bescherming in actie

Deze afbeelding staat op een externe server en wordt daarom niet geladen in de modus *Volledige bescherming*:

![Externe afbeelding](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)

Deze link blijft inactief totdat "Links toestaan" is ingeschakeld: [CommonMark](https://commonmark.org/).

En deze link is verdacht — de tekst toont het ene adres, maar hij leidt naar een ander: [https://bank.example.com](https://bank-example.xyz/login).

---

Sneltoetsen: <kbd>Ctrl</kbd>+<kbd>B</kbd> vet, <kbd>Ctrl</kbd>+<kbd>I</kbd> cursief, <kbd>Ctrl</kbd>+<kbd>K</kbd> link, <kbd>Ctrl</kbd>+<kbd>S</kbd> opslaan, <kbd>Ctrl</kbd>+<kbd>O</kbd> openen, <kbd>Ctrl</kbd>+<kbd>F</kbd> zoeken.

[^1]: Zo ziet een voetnoot eruit.
`,
};

export default nl;
