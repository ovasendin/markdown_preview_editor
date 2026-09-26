import type { Messages } from '../index';

const it: Messages = {
  'app.framed': 'Questo sito non può essere aperto all’interno di un’altra pagina.',

  'header.viewMode': 'Modalità di visualizzazione',
  'view.editor': 'Editor',
  'view.split': 'Diviso',
  'view.preview': 'Anteprima',
  'theme.toggle': 'Cambia tema',
  'theme.light': 'Tema chiaro',
  'theme.dark': 'Tema scuro',
  'settings.title': 'Impostazioni',
  'file.open': 'Apri',
  'file.openTitle': 'Apri file (Ctrl+O)',
  'file.folder': 'Cartella',
  'file.folderTitle': 'Apri una cartella con documenti e immagini',
  'file.save': 'Salva',
  'file.saveTitle': 'Salva .md (Ctrl+S)',
  'file.html': 'HTML',
  'file.htmlTitle': 'Esporta in un file HTML autonomo',
  'file.print': 'Stampa',
  'file.printTitle': 'Stampa o salva come PDF',
  'menu.title': 'Menu',
  'menu.folder': 'Apri cartella',
  'menu.save': 'Salva come .md',
  'menu.html': 'Esporta in HTML',
  'menu.print': 'Stampa / salva come PDF',

  'pane.editor': 'Editor',
  'pane.preview': 'Anteprima',
  'pane.resize': 'Ridimensiona i pannelli',
  'toolbar.formatting': 'Formattazione',
  'drop.title': 'Rilascia per aprire',
  'drop.hint1': '.md, .txt, immagini, audio, video o un’intera cartella.',
  'drop.hint2': 'I file vengono letti solo nel tuo browser e non vengono mai caricati.',
  'drop.wrongPlace': 'Rilascia i file sull’editor (parte sinistra della finestra)',

  'prot.panel': 'Protezione',
  'prot.full': 'Protezione completa',
  'prot.fullDesc': 'Il documento non può accedere alla rete: i link esterni sono inattivi; immagini, audio e video esterni non vengono caricati.',
  'prot.permissions': 'Autorizzazioni',
  'prot.links': 'Consenti i link',
  'prot.linksDesc': 'Si aprono in una nuova scheda senza rivelare l’indirizzo di questa pagina. Quelli sospetti solo dopo conferma.',
  'prot.images': 'Consenti immagini esterne',
  'prot.imagesDesc': 'Il server dell’immagine vedrà il tuo indirizzo IP e quando hai aperto il documento.',
  'prot.media': 'Consenti audio e video esterni',
  'prot.mediaDesc': 'Controlli standard del lettore, mai riproduzione automatica.',
  'prot.checkTitle': 'Controllo leggero delle minacce.',
  'prot.checkText': 'Link e contenuti multimediali vengono anche verificati con euristiche: trucchi di phishing, domini che imitano altri siti, eseguibili, indirizzi della rete locale. Gli elementi pericolosi vengono sempre bloccati. Non è un antivirus.',
  'prot.localNote': 'Immagini e contenuti multimediali rilasciati insieme a un documento vengono sempre mostrati: non serve la rete. Le autorizzazioni si azzerano quando la pagina viene ricaricata.',
  'prot.relaxed': 'Protezione ridotta',
  'prot.fullTooltip': 'Protezione completa: il documento non può accedere alla rete',
  'prot.allowed': 'Consentito: {list}',
  'prot.listLinks': 'link',
  'prot.listImages': 'immagini',
  'prot.listMedia': 'audio e video',
  'prot.enableHint': 'Per ridurre la protezione, attiva una delle autorizzazioni qui sotto',

  'settings.language': 'Lingua',
  'settings.languageAuto': 'Lingua del browser',
  'settings.sync': 'Scorrimento sincronizzato',
  'settings.remember': 'Ricorda i documenti in questo browser',
  'settings.rememberOn': 'Attivo: il testo dei documenti aperti viene salvato in questo browser (senza immagini). Disattivalo sui computer condivisi.',
  'settings.rememberOff': 'Disattivo: chiudendo la scheda del browser si cancella tutto. Attivalo solo sul tuo computer personale.',
  'settings.clear': 'Cancella tutto',
  'settings.clearNote': 'Chiude tutti i documenti e li rimuove dalla memoria e dall’archivio del browser.',
  'settings.privacy': 'Tutti i documenti vengono elaborati solo nel tuo browser. Il sito non usa strumenti di analisi e non contatta mai server di terze parti.',

  'tab.untitled': 'Senza titolo {n}.md',
  'tab.close': 'Chiudi',
  'tab.closeNamed': 'Chiudi {name}',
  'tab.new': 'Nuovo documento',
  'dialog.cancel': 'Annulla',
  'dialog.close': 'Chiudi',
  'close.title': 'Chiudere senza salvare?',
  'close.body': '«{name}» contiene modifiche non salvate. Andranno perse.',
  'clear.title': 'Cancellare tutto?',
  'clear.body': 'Tutti i documenti aperti verranno chiusi e rimossi dalla memoria e dall’archivio del browser. Le modifiche non salvate andranno perse.',
  'clear.ok': 'Cancella',
  'clear.done': 'Tutto cancellato',

  'status.counts': 'Parole: {words} · Caratteri: {chars} · Righe: {lines} · ~{minutes} min di lettura',
  'status.blocked': 'Bloccati dalla protezione: {n}',
  'status.dangers': 'Pericolosi: {n}',
  'status.warnings': 'Sospetti: {n}',
  'status.missing': 'File mancanti: {n}',
  'status.details': 'Mostra dettagli',
  'status.private': 'Solo nel tuo browser',
  'status.privateTitle': 'I documenti non lasciano mai il tuo browser: il sito non ha un server che possa riceverli e la sua politica di sicurezza vieta le richieste di rete.',

  'issues.title': 'Risorse esterne e controllo delle minacce',
  'issues.danger': 'Pericoloso — bloccato',
  'issues.warn': 'Sospetto',
  'issues.blocked': 'Bloccato dalla modalità di protezione',
  'issues.missing': 'File locale non trovato',
  'issues.unsupported': 'Non supportato',
  'issues.note': 'È un controllo leggero: euristiche eseguite nel browser, senza inviare indirizzi a servizi online. Non è un antivirus.',

  'link.title': 'Link sospetto',
  'link.found': 'Il controllo leggero ha rilevato segnali di allarme:',
  'link.address': 'Indirizzo:',
  'link.note': 'È un’euristica, non un antivirus. Aprilo solo se ti fidi della fonte.',
  'link.open': 'Apri comunque',

  'files.opened': 'Documenti aperti: {n}',
  'files.media': 'file multimediali: {n}',
  'files.skipped': 'ignorati: {n} ({names})',
  'files.readError': 'Impossibile leggere i file: {error}',
  'files.tooLarge': 'Il file «{name}» è troppo grande (oltre 20 MB)',
  'files.notText': 'Il file «{name}» non sembra un file di testo',
  'save.done': 'Salvato: {name} (nella cartella dei download del browser)',
  'export.done': 'Esportato: {name}',
  'render.error': 'Errore di visualizzazione: {error}',

  'editor.placeholder': 'Inizia a scrivere in Markdown o rilascia qui i file…',
  'editor.aria': 'Editor Markdown',
  'preview.frameTitle': 'Anteprima del documento',

  'tb.undo': 'Annulla (Ctrl+Z)',
  'tb.redo': 'Ripeti (Ctrl+Y)',
  'tb.heading': 'Titolo',
  'tb.normal': 'Testo normale',
  'tb.headingN': 'Titolo {n}',
  'tb.bold': 'Grassetto (Ctrl+B)',
  'tb.italic': 'Corsivo (Ctrl+I)',
  'tb.strike': 'Barrato',
  'tb.link': 'Link (Ctrl+K)',
  'tb.image': 'Immagine',
  'tb.bullets': 'Elenco puntato',
  'tb.numbers': 'Elenco numerato',
  'tb.tasks': 'Elenco di attività',
  'tb.quote': 'Citazione',
  'tb.code': 'Codice in linea',
  'tb.codeBlock': 'Blocco di codice',
  'tb.table': 'Tabella',
  'tb.rule': 'Linea orizzontale',
  'tb.advanced': 'Editor avanzato',
  'tb.headings46': 'Titoli 4–6',
  'tb.highlight': 'Evidenziato ==testo==',
  'tb.sup': 'Apice x^2^',
  'tb.sub': 'Pedice H~2~O',
  'tb.kbd': 'Tasto <kbd>',
  'tb.footnote': 'Nota a piè di pagina',
  'tb.details': 'Sezione espandibile (spoiler)',
  'tb.alert': 'Riquadro di avviso',
  'tb.alertNote': 'Nota',
  'tb.alertTip': 'Suggerimento',
  'tb.alertImportant': 'Importante',
  'tb.alertWarning': 'Avviso',
  'tb.alertCaution': 'Attenzione',
  'tb.math': 'Formula matematica',
  'tb.mermaid': 'Diagramma Mermaid',
  'tb.toc': 'Indice',
  'tb.tocEmpty': 'Il documento non contiene titoli per creare un indice',
  'tb.indent': 'Aumenta rientro',
  'tb.outdent': 'Riduci rientro',
  'tb.find': 'Trova e sostituisci (Ctrl+F)',
  'tb.lineNumbers': 'Numeri di riga',
  'tb.wrap': 'A capo automatico',

  'snip.text': 'testo',
  'snip.description': 'descrizione',
  'snip.linkText': 'testo del link',
  'snip.column': 'Colonna {n}',
  'snip.cell': 'cella',
  'snip.code': 'codice',
  'snip.detailsTitle': 'Titolo',
  'snip.detailsBody': 'Contenuto nascosto',
  'snip.alertText': 'Testo del messaggio',
  'snip.contents': 'Indice',
  'snip.mmdStart': 'Inizio',
  'snip.mmdCondition': 'Condizione',
  'snip.mmdYes': 'Sì',
  'snip.mmdNo': 'No',
  'snip.mmdResult': 'Risultato',
  'snip.mmdOther': 'Altro percorso',

  'md.note': 'Nota',
  'md.tip': 'Suggerimento',
  'md.important': 'Importante',
  'md.warning': 'Avviso',
  'md.caution': 'Attenzione',
  'md.frontMatter': 'Metadati (front matter)',
  'media.image': 'immagine',
  'media.audio': 'audio',
  'media.video': 'video',
  'pv.link': 'link',
  'pv.embed': 'pagina incorporata',
  'pv.embedReason': 'L’incorporamento di pagine e lettori di terze parti non è supportato',
  'pv.embedTitle': 'Pagina incorporata non supportata',
  'pv.badgeDanger': 'Bloccato (controllo leggero):',
  'pv.badgeWarn': 'Sospetto (controllo leggero):',
  'pv.empty': 'Riferimento vuoto',
  'pv.dangerSource': 'Fonte pericolosa bloccata',
  'pv.blockedImage': 'Immagine esterna bloccata — attiva «{hint}»',
  'pv.blockedMedia': 'Audio o video esterno bloccato — attiva «{hint}»',
  'pv.localMissing': 'File locale non trovato: {path}',
  'pv.localMissingHint': 'Rilascialo insieme al documento oppure rilascia l’intera cartella',
  'pv.fileBlocked': 'File «{name}» bloccato',
  'pv.noSource': 'Nessuna sorgente multimediale',
  'pv.openDoc': 'Apri il documento {path}',
  'pv.localLink': 'Il file locale «{path}» non è aperto — rilascialo insieme al documento',
  'pv.linkBlocked': 'Link bloccato: {url}',
  'pv.linksDisabled': 'I link sono disattivati (protezione completa): {url}\nAttiva «{hint}» per seguirli.',
  'pv.diagram': 'Diagramma',
  'pv.diagramError': 'Errore nel diagramma: {error}',

  'url.bidi': 'L’indirizzo contiene caratteri invisibili di direzione del testo — un trucco per camuffare i nomi dei file',
  'url.control': 'L’indirizzo contiene caratteri di controllo — un trucco per aggirare i filtri',
  'url.data': 'I dati incorporati (data:) di questo tipo possono contenere codice eseguibile',
  'url.invalid': 'Indirizzo non valido',
  'url.scheme': 'Tipo di indirizzo non consentito «{scheme}:» — può eseguire codice o aprire file locali',
  'url.credentials': 'L’indirizzo nasconde nome utente o password (user@host) — un classico trucco di phishing: il vero sito è la parte dopo la «@»',
  'url.localLink': 'Indirizzo della rete locale (router, NAS, localhost)',
  'url.localMedia': 'Il caricamento dalla rete locale è vietato: il documento potrebbe sondare i dispositivi della tua rete',
  'url.ip': 'Indirizzo IP al posto di un nome di dominio',
  'url.unknownTld': 'Dominio di primo livello sconosciuto «.{tld}»',
  'url.scamTld': 'Il dominio «.{tld}» è usato spesso per truffe',
  'url.mixed': 'Il dominio «{host}» mescola alfabeti diversi — potrebbe imitare un sito noto',
  'url.idn': 'Dominio internazionalizzato «{host}» — verifica che non imiti un indirizzo simile',
  'url.shortener': 'Accorciatore di link — la vera destinazione è nascosta',
  'url.subdomains': 'Troppi sottodomini — un trucco per camuffare l’indirizzo reale',
  'url.port': 'Porta non standard {port}',
  'url.http': 'Connessione non cifrata (http://) — il contenuto può essere alterato durante il percorso',
  'url.doubleExt': 'Doppia estensione «{name}» — un eseguibile camuffato da documento',
  'url.executable': 'Punta a un eseguibile o a un documento con macro (.{ext})',
  'url.long': 'Indirizzo molto lungo',
  'url.encoded': 'Indirizzo fortemente codificato — potrebbe nascondere il suo contenuto',
  'url.textMismatch': 'Il testo del link mostra «{shown}», ma porta a «{host}»',

  'filecheck.disguised': 'Il file «{name}» finge di essere un file multimediale, ma in realtà è {what}',
  'filecheck.unknown': 'Impossibile riconoscere il formato di «{name}» dal suo contenuto',
  'filecheck.mismatch': 'L’estensione di «{name}» non corrisponde al contenuto ({detected})',
  'filecheck.svgActive': 'L’SVG «{name}» contiene contenuti attivi (script o HTML incorporato). Viene mostrato come una semplice immagine, dove il browser non li esegue mai',
  'what.exe': 'un eseguibile Windows',
  'what.elf': 'un eseguibile Linux',
  'what.macho': 'un eseguibile macOS',
  'what.script': 'uno script',
  'what.html': 'una pagina web',
  'what.zip': 'un archivio ZIP (o un documento Office)',
  'what.rar': 'un archivio RAR',
  'what.7z': 'un archivio 7z',
  'what.ole': 'un vecchio documento Office (può contenere macro)',
  'what.pdf': 'un documento PDF',

  'sample.name': 'Benvenuto.md',
  'sample.body': `# Markdown Preview Editor

Un editor **Markdown** con anteprima che funziona *solo all’interno del tuo browser*.
I documenti non vengono mai inviati da nessuna parte: né a questo sito, né a nessun altro.

> [!TIP]
> Rilascia un file \`.md\`, più file o un’intera cartella sulla **metà sinistra della finestra**: si apriranno in schede.
> Le immagini rilasciate insieme a un documento vengono collegate automaticamente.

## Funzionalità

- [x] Anteprima in tempo reale e scorrimento sincronizzato
- [x] Tabelle, elenchi di attività, note a piè di pagina[^1], ==evidenziato==, H~2~O e x^2^
- [x] Evidenziazione del codice, formule e diagrammi
- [ ] Inviare i tuoi dati da qualche parte — **mai**

| Modalità | Link esterni | Immagini esterne |
| :--- | :---: | :---: |
| Protezione completa | inattivi | non caricate |
| Con autorizzazioni | verificati | verificate |

## Codice

\`\`\`typescript
function greet(name: string): string {
  return \`Ciao, \${name}!\`;
}
\`\`\`

## Formule

Identità di Eulero: $e^{i\\pi} + 1 = 0$

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}
$$

## Diagrammi

\`\`\`mermaid
flowchart LR
    A[File .md] --> B(Browser)
    B --> C{Risorse esterne?}
    C -->|Protezione completa| D[Bloccate]
    C -->|Consentite| E[Controllo delle minacce]
\`\`\`

## La protezione in azione

Questa immagine si trova su un server esterno, quindi non viene caricata in modalità *Protezione completa*:

![Immagine esterna](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)

Questo link resta inattivo finché non attivi «Consenti i link»: [CommonMark](https://commonmark.org/).

E questo link è sospetto: il testo mostra un indirizzo, ma porta a un altro: [https://bank.example.com](https://bank-example.xyz/login).

---

Scorciatoie: <kbd>Ctrl</kbd>+<kbd>B</kbd> grassetto, <kbd>Ctrl</kbd>+<kbd>I</kbd> corsivo, <kbd>Ctrl</kbd>+<kbd>K</kbd> link, <kbd>Ctrl</kbd>+<kbd>S</kbd> salva, <kbd>Ctrl</kbd>+<kbd>O</kbd> apri, <kbd>Ctrl</kbd>+<kbd>F</kbd> cerca.

[^1]: Ecco come appare una nota a piè di pagina.
`,
};

export default it;
