import type { Messages } from '../index';

const sv: Messages = {
  'app.framed': 'Den här webbplatsen kan inte öppnas inuti en annan sida.',

  'header.viewMode': 'Visningsläge',
  'view.editor': 'Redigerare',
  'view.split': 'Delad',
  'view.preview': 'Förhandsvisning',
  'theme.toggle': 'Byt tema',
  'theme.light': 'Ljust tema',
  'theme.dark': 'Mörkt tema',
  'settings.title': 'Inställningar',
  'file.open': 'Öppna',
  'file.openTitle': 'Öppna filer (Ctrl+O)',
  'file.folder': 'Mapp',
  'file.folderTitle': 'Öppna en mapp med dokument och bilder',
  'file.save': 'Spara',
  'file.saveTitle': 'Spara .md (Ctrl+S)',
  'file.html': 'HTML',
  'file.htmlTitle': 'Exportera till en fristående HTML-fil',
  'file.print': 'Skriv ut',
  'file.printTitle': 'Skriv ut eller spara som PDF',

  'pane.editor': 'Redigerare',
  'pane.preview': 'Förhandsvisning',
  'pane.resize': 'Ändra storlek på panelerna',
  'toolbar.formatting': 'Formatering',
  'drop.title': 'Släpp för att öppna',
  'drop.hint1': '.md, .txt, bilder, ljud, video eller en hel mapp.',
  'drop.hint2': 'Filerna läses bara i din webbläsare och laddas aldrig upp.',
  'drop.wrongPlace': 'Släpp filerna på redigeraren (vänstra delen av fönstret)',

  'prot.panel': 'Skydd',
  'prot.full': 'Fullt skydd',
  'prot.fullDesc': 'Dokumentet har ingen åtkomst till nätverket: externa länkar är inaktiva och externa bilder, ljud och video laddas inte.',
  'prot.permissions': 'Behörigheter',
  'prot.links': 'Tillåt länkar',
  'prot.linksDesc': 'Öppnas i en ny flik utan att den här sidans adress avslöjas. Misstänkta länkar först efter bekräftelse.',
  'prot.images': 'Tillåt externa bilder',
  'prot.imagesDesc': 'Bildservern ser din IP-adress och när du öppnade dokumentet.',
  'prot.media': 'Tillåt externt ljud och video',
  'prot.mediaDesc': 'Vanliga spelarkontroller, aldrig automatisk uppspelning.',
  'prot.checkTitle': 'Enkel hotkontroll.',
  'prot.checkText': 'Länkar och media kontrolleras också med heuristik: nätfisketrick, förfalskade domäner, körbara filer, adresser i det lokala nätverket. Farliga objekt blockeras alltid. Det här är inget antivirusprogram.',
  'prot.localNote': 'Bilder och media som släpps tillsammans med ett dokument visas alltid – de behöver inget nätverk. Behörigheterna återställs när sidan laddas om.',
  'prot.relaxed': 'Skyddet är sänkt',
  'prot.fullTooltip': 'Fullt skydd: dokumentet har ingen åtkomst till nätverket',
  'prot.allowed': 'Tillåtet: {list}',
  'prot.listLinks': 'länkar',
  'prot.listImages': 'bilder',
  'prot.listMedia': 'ljud och video',
  'prot.enableHint': 'Aktivera någon av behörigheterna nedan för att sänka skyddet',

  'settings.language': 'Språk',
  'settings.languageAuto': 'Webbläsarens språk',
  'settings.sync': 'Synkroniserad rullning',
  'settings.remember': 'Kom ihåg dokument i den här webbläsaren',
  'settings.rememberOn': 'På: texten i öppna dokument sparas i den här webbläsaren (utan bilder). Stäng av på delade datorer.',
  'settings.rememberOff': 'Av: allt raderas när webbläsarfliken stängs. Slå bara på det på din egen dator.',
  'settings.clear': 'Rensa allt',
  'settings.clearNote': 'Stänger alla dokument och tar bort dem från minnet och webbläsarens lagring.',
  'settings.privacy': 'Alla dokument behandlas endast i din webbläsare. Webbplatsen har ingen analys och kontaktar aldrig tredjepartsservrar.',

  'tab.untitled': 'Namnlös {n}.md',
  'tab.close': 'Stäng',
  'tab.closeNamed': 'Stäng {name}',
  'tab.new': 'Nytt dokument',
  'dialog.cancel': 'Avbryt',
  'dialog.close': 'Stäng',
  'close.title': 'Stäng utan att spara?',
  'close.body': '”{name}” har osparade ändringar. De går förlorade.',
  'clear.title': 'Rensa allt?',
  'clear.body': 'Alla öppna dokument stängs och tas bort från minnet och webbläsarens lagring. Osparade ändringar går förlorade.',
  'clear.ok': 'Rensa',
  'clear.done': 'Allt har rensats',

  'status.counts': 'Ord: {words} · Tecken: {chars} · Rader: {lines} · ~{minutes} min läsning',
  'status.blocked': 'Blockerat av skyddet: {n}',
  'status.dangers': 'Farliga: {n}',
  'status.warnings': 'Misstänkta: {n}',
  'status.missing': 'Saknade filer: {n}',
  'status.details': 'Visa detaljer',
  'status.private': 'Endast i din webbläsare',
  'status.privateTitle': 'Dokumenten lämnar aldrig din webbläsare: webbplatsen har ingen server som kan ta emot dem, och säkerhetspolicyn förbjuder nätverksanrop.',

  'issues.title': 'Externa resurser och hotkontroll',
  'issues.danger': 'Farligt – blockerat',
  'issues.warn': 'Misstänkt',
  'issues.blocked': 'Blockerat av skyddsläget',
  'issues.missing': 'Lokal fil hittades inte',
  'issues.unsupported': 'Stöds inte',
  'issues.note': 'Det här är en enkel kontroll: heuristik som körs i webbläsaren, utan att adresser skickas till någon onlinetjänst. Det är inget antivirusprogram.',

  'link.title': 'Misstänkt länk',
  'link.found': 'Den enkla kontrollen hittade varningstecken:',
  'link.address': 'Adress:',
  'link.note': 'Det här är en heuristik, inte ett antivirusprogram. Öppna bara om du litar på källan.',
  'link.open': 'Öppna ändå',

  'files.opened': 'Öppnade dokument: {n}',
  'files.media': 'mediefiler: {n}',
  'files.skipped': 'överhoppade: {n} ({names})',
  'files.readError': 'Det gick inte att läsa filerna: {error}',
  'files.tooLarge': 'Filen ”{name}” är för stor (över 20 MB)',
  'files.notText': 'Filen ”{name}” verkar inte vara en textfil',
  'save.done': 'Sparat: {name} (i webbläsarens mapp för hämtade filer)',
  'export.done': 'Exporterat: {name}',
  'render.error': 'Visningsfel: {error}',

  'editor.placeholder': 'Börja skriva Markdown eller släpp filer här…',
  'editor.aria': 'Markdown-redigerare',
  'preview.frameTitle': 'Förhandsvisning av dokumentet',

  'tb.undo': 'Ångra (Ctrl+Z)',
  'tb.redo': 'Gör om (Ctrl+Y)',
  'tb.heading': 'Rubrik',
  'tb.normal': 'Normal text',
  'tb.headingN': 'Rubrik {n}',
  'tb.bold': 'Fet (Ctrl+B)',
  'tb.italic': 'Kursiv (Ctrl+I)',
  'tb.strike': 'Genomstruken',
  'tb.link': 'Länk (Ctrl+K)',
  'tb.image': 'Bild',
  'tb.bullets': 'Punktlista',
  'tb.numbers': 'Numrerad lista',
  'tb.tasks': 'Uppgiftslista',
  'tb.quote': 'Citat',
  'tb.code': 'Kod i löptext',
  'tb.codeBlock': 'Kodblock',
  'tb.table': 'Tabell',
  'tb.rule': 'Horisontell linje',
  'tb.advanced': 'Avancerad redigerare',
  'tb.headings46': 'Rubriker 4–6',
  'tb.highlight': 'Markering ==text==',
  'tb.sup': 'Upphöjd x^2^',
  'tb.sub': 'Nedsänkt H~2~O',
  'tb.kbd': 'Tangent <kbd>',
  'tb.footnote': 'Fotnot',
  'tb.details': 'Hopfällbart avsnitt (spoiler)',
  'tb.alert': 'Informationsruta',
  'tb.alertNote': 'Obs',
  'tb.alertTip': 'Tips',
  'tb.alertImportant': 'Viktigt',
  'tb.alertWarning': 'Varning',
  'tb.alertCaution': 'Försiktighet',
  'tb.math': 'Matematisk formel',
  'tb.mermaid': 'Mermaid-diagram',
  'tb.toc': 'Innehållsförteckning',
  'tb.tocEmpty': 'Dokumentet har inga rubriker för en innehållsförteckning',
  'tb.indent': 'Öka indrag',
  'tb.outdent': 'Minska indrag',
  'tb.find': 'Sök och ersätt (Ctrl+F)',
  'tb.lineNumbers': 'Radnummer',
  'tb.wrap': 'Radbrytning',

  'snip.text': 'text',
  'snip.description': 'beskrivning',
  'snip.linkText': 'länktext',
  'snip.column': 'Kolumn {n}',
  'snip.cell': 'cell',
  'snip.code': 'kod',
  'snip.detailsTitle': 'Rubrik',
  'snip.detailsBody': 'Dolt innehåll',
  'snip.alertText': 'Meddelandetext',
  'snip.contents': 'Innehåll',
  'snip.mmdStart': 'Start',
  'snip.mmdCondition': 'Villkor',
  'snip.mmdYes': 'Ja',
  'snip.mmdNo': 'Nej',
  'snip.mmdResult': 'Resultat',
  'snip.mmdOther': 'Annan väg',

  'md.note': 'Obs',
  'md.tip': 'Tips',
  'md.important': 'Viktigt',
  'md.warning': 'Varning',
  'md.caution': 'Försiktighet',
  'md.frontMatter': 'Metadata (front matter)',
  'media.image': 'bild',
  'media.audio': 'ljud',
  'media.video': 'video',
  'pv.link': 'länk',
  'pv.embed': 'inbäddad sida',
  'pv.embedReason': 'Inbäddning av sidor och spelare från tredje part stöds inte',
  'pv.embedTitle': 'Inbäddad sida stöds inte',
  'pv.badgeDanger': 'Blockerat (enkel kontroll):',
  'pv.badgeWarn': 'Misstänkt (enkel kontroll):',
  'pv.empty': 'Tom referens',
  'pv.dangerSource': 'Farlig källa blockerad',
  'pv.blockedImage': 'Extern bild blockerad – aktivera ”{hint}”',
  'pv.blockedMedia': 'Externt ljud eller video blockerat – aktivera ”{hint}”',
  'pv.localMissing': 'Lokal fil hittades inte: {path}',
  'pv.localMissingHint': 'Släpp den tillsammans med dokumentet, eller släpp hela mappen',
  'pv.fileBlocked': 'Filen ”{name}” blockerad',
  'pv.noSource': 'Ingen mediekälla',
  'pv.openDoc': 'Öppna dokumentet {path}',
  'pv.localLink': 'Den lokala filen ”{path}” är inte öppen – släpp den tillsammans med dokumentet',
  'pv.linkBlocked': 'Länk blockerad: {url}',
  'pv.linksDisabled': 'Länkar är avstängda (fullt skydd): {url}\nAktivera ”{hint}” för att följa dem.',
  'pv.diagram': 'Diagram',
  'pv.diagramError': 'Fel i diagrammet: {error}',

  'url.bidi': 'Adressen innehåller osynliga tecken för textriktning – ett trick för att dölja filnamn',
  'url.control': 'Adressen innehåller styrtecken – ett trick för att kringgå filter',
  'url.data': 'Inbäddade data (data:) av den här typen kan innehålla körbar kod',
  'url.invalid': 'Ogiltig adress',
  'url.scheme': 'Otillåten adresstyp ”{scheme}:” – den kan köra kod eller öppna lokala filer',
  'url.credentials': 'Adressen döljer ett användarnamn eller lösenord (user@host) – ett klassiskt nätfisketrick: den riktiga webbplatsen är delen efter ”@”',
  'url.localLink': 'Adress i det lokala nätverket (router, NAS, localhost)',
  'url.localMedia': 'Det är förbjudet att ladda från det lokala nätverket: dokumentet skulle kunna söka av enheter i ditt nätverk',
  'url.ip': 'IP-adress i stället för domännamn',
  'url.unknownTld': 'Okänd toppdomän ”.{tld}”',
  'url.scamTld': 'Domänen ”.{tld}” används ofta för bedrägerier',
  'url.mixed': 'Domänen ”{host}” blandar alfabet – den kan imitera en känd webbplats',
  'url.idn': 'Internationaliserad domän ”{host}” – kontrollera att den inte efterliknar en liknande adress',
  'url.shortener': 'Länkförkortare – det verkliga målet är dolt',
  'url.subdomains': 'För många underdomäner – ett trick för att dölja den riktiga adressen',
  'url.port': 'Icke-standardport {port}',
  'url.http': 'Okrypterad anslutning (http://) – innehållet kan ändras på vägen',
  'url.doubleExt': 'Dubbel filändelse ”{name}” – en körbar fil förklädd till dokument',
  'url.executable': 'Pekar på en körbar fil eller ett dokument med makron (.{ext})',
  'url.long': 'Mycket lång adress',
  'url.encoded': 'Kraftigt kodad adress – kan dölja sitt innehåll',
  'url.textMismatch': 'Länktexten visar ”{shown}”, men länken leder till ”{host}”',

  'filecheck.disguised': 'Filen ”{name}” utger sig för att vara media men är egentligen {what}',
  'filecheck.unknown': 'Det gick inte att avgöra formatet på ”{name}” utifrån innehållet',
  'filecheck.mismatch': 'Filändelsen för ”{name}” matchar inte innehållet ({detected})',
  'filecheck.svgActive': 'SVG-filen ”{name}” innehåller aktivt innehåll (skript eller inbäddad HTML). Den visas som en vanlig bild, där webbläsaren aldrig kör det',
  'what.exe': 'en körbar Windows-fil',
  'what.elf': 'en körbar Linux-fil',
  'what.macho': 'en körbar macOS-fil',
  'what.script': 'ett skript',
  'what.html': 'en webbsida',
  'what.zip': 'ett ZIP-arkiv (eller Office-dokument)',
  'what.rar': 'ett RAR-arkiv',
  'what.7z': 'ett 7z-arkiv',
  'what.ole': 'ett äldre Office-dokument (kan innehålla makron)',
  'what.pdf': 'ett PDF-dokument',

  'sample.name': 'Välkommen.md',
  'sample.body': `# Markdown Preview Editor

En **Markdown**-redigerare med förhandsvisning som fungerar *enbart i din webbläsare*.
Dokumenten skickas aldrig någonstans – varken till den här webbplatsen eller till någon annan.

> [!TIP]
> Släpp en \`.md\`-fil, flera filer eller en hel mapp på **vänstra halvan av fönstret** – de öppnas i flikar.
> Bilder som släpps tillsammans med ett dokument kopplas in automatiskt.

## Funktioner

- [x] Förhandsvisning i realtid och synkroniserad rullning
- [x] Tabeller, uppgiftslistor, fotnoter[^1], ==markering==, H~2~O och x^2^
- [x] Kodfärgning, formler och diagram
- [ ] Skicka dina data någonstans – **aldrig**

| Läge | Externa länkar | Externa bilder |
| :--- | :---: | :---: |
| Fullt skydd | inaktiva | laddas inte |
| Med behörigheter | kontrolleras | kontrolleras |

## Kod

\`\`\`typescript
function greet(name: string): string {
  return \`Hej, \${name}!\`;
}
\`\`\`

## Formler

Eulers identitet: $e^{i\\pi} + 1 = 0$

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}
$$

## Diagram

\`\`\`mermaid
flowchart LR
    A[.md-fil] --> B(Webbläsare)
    B --> C{Externa resurser?}
    C -->|Fullt skydd| D[Blockerade]
    C -->|Tillåtna| E[Hotkontroll]
\`\`\`

## Skyddet i praktiken

Den här bilden ligger på en extern server och laddas därför inte i läget *Fullt skydd*:

![Extern bild](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)

Den här länken är inaktiv tills ”Tillåt länkar” har aktiverats: [CommonMark](https://commonmark.org/).

Och den här länken är misstänkt – texten visar en adress, men länken leder till en annan: [https://bank.example.com](https://bank-example.xyz/login).

---

Kortkommandon: <kbd>Ctrl</kbd>+<kbd>B</kbd> fet, <kbd>Ctrl</kbd>+<kbd>I</kbd> kursiv, <kbd>Ctrl</kbd>+<kbd>K</kbd> länk, <kbd>Ctrl</kbd>+<kbd>S</kbd> spara, <kbd>Ctrl</kbd>+<kbd>O</kbd> öppna, <kbd>Ctrl</kbd>+<kbd>F</kbd> sök.

[^1]: Så här ser en fotnot ut.
`,
};

export default sv;
