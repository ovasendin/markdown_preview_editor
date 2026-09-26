import type { Messages } from '../index';

const fr: Messages = {
  'app.framed': 'Ce site ne peut pas être ouvert à l’intérieur d’une autre page.',

  'header.viewMode': 'Mode d’affichage',
  'view.editor': 'Éditeur',
  'view.split': 'Partagé',
  'view.preview': 'Aperçu',
  'theme.toggle': 'Changer de thème',
  'theme.light': 'Thème clair',
  'theme.dark': 'Thème sombre',
  'settings.title': 'Paramètres',
  'file.open': 'Ouvrir',
  'file.openTitle': 'Ouvrir des fichiers (Ctrl+O)',
  'file.folder': 'Dossier',
  'file.folderTitle': 'Ouvrir un dossier contenant des documents et des images',
  'file.save': 'Enregistrer',
  'file.saveTitle': 'Enregistrer le .md (Ctrl+S)',
  'file.html': 'HTML',
  'file.htmlTitle': 'Exporter vers un fichier HTML autonome',
  'file.print': 'Imprimer',
  'file.printTitle': 'Imprimer ou enregistrer en PDF',
  'menu.title': 'Menu',
  'menu.folder': 'Ouvrir un dossier',
  'menu.save': 'Enregistrer en .md',
  'menu.html': 'Exporter en HTML',
  'menu.print': 'Imprimer / enregistrer en PDF',

  'pane.editor': 'Éditeur',
  'pane.preview': 'Aperçu',
  'pane.resize': 'Redimensionner les panneaux',
  'toolbar.formatting': 'Mise en forme',
  'drop.title': 'Déposez pour ouvrir',
  'drop.hint1': '.md, .txt, images, audio, vidéo ou un dossier entier.',
  'drop.hint2': 'Les fichiers sont lus uniquement dans votre navigateur et ne sont jamais envoyés.',
  'drop.wrongPlace': 'Déposez les fichiers sur l’éditeur (partie gauche de la fenêtre)',

  'prot.panel': 'Protection',
  'prot.full': 'Protection totale',
  'prot.fullDesc': 'Le document ne peut pas accéder au réseau : les liens externes sont inactifs ; les images, sons et vidéos externes ne sont pas chargés.',
  'prot.permissions': 'Autorisations',
  'prot.links': 'Autoriser les liens',
  'prot.linksDesc': 'Ils s’ouvrent dans un nouvel onglet sans révéler l’adresse de cette page. Les liens suspects, seulement après confirmation.',
  'prot.images': 'Autoriser les images externes',
  'prot.imagesDesc': 'Le serveur de l’image verra votre adresse IP et le moment où vous avez ouvert le document.',
  'prot.media': 'Autoriser l’audio et la vidéo externes',
  'prot.mediaDesc': 'Commandes de lecteur standard, jamais de lecture automatique.',
  'prot.checkTitle': 'Vérification légère des menaces.',
  'prot.checkText': 'Les liens et les médias sont aussi vérifiés par des heuristiques : techniques d’hameçonnage, domaines imitant d’autres sites, exécutables, adresses du réseau local. Les éléments dangereux sont toujours bloqués. Ce n’est pas un antivirus.',
  'prot.localNote': 'Les images et médias déposés avec un document sont toujours affichés : ils n’ont pas besoin du réseau. Les autorisations sont réinitialisées au rechargement de la page.',
  'prot.relaxed': 'Protection assouplie',
  'prot.fullTooltip': 'Protection totale : le document ne peut pas accéder au réseau',
  'prot.allowed': 'Autorisé : {list}',
  'prot.listLinks': 'liens',
  'prot.listImages': 'images',
  'prot.listMedia': 'audio et vidéo',
  'prot.enableHint': 'Pour assouplir la protection, activez l’une des autorisations ci-dessous',

  'settings.language': 'Langue',
  'settings.languageAuto': 'Langue du navigateur',
  'settings.sync': 'Défilement synchronisé',
  'settings.remember': 'Mémoriser les documents dans ce navigateur',
  'settings.rememberOn': 'Activé : le texte des documents ouverts est conservé dans ce navigateur (sans les images). Désactivez-le sur un ordinateur partagé.',
  'settings.rememberOff': 'Désactivé : fermer l’onglet du navigateur efface tout. Activez-le uniquement sur votre ordinateur personnel.',
  'settings.clear': 'Tout effacer',
  'settings.clearNote': 'Ferme tous les documents et les supprime de la mémoire et du stockage du navigateur.',
  'settings.privacy': 'Tous les documents sont traités uniquement dans votre navigateur. Le site ne contient aucun outil d’analyse et ne contacte jamais de serveurs tiers.',

  'tab.untitled': 'Sans titre {n}.md',
  'tab.close': 'Fermer',
  'tab.closeNamed': 'Fermer {name}',
  'tab.new': 'Nouveau document',
  'dialog.cancel': 'Annuler',
  'dialog.close': 'Fermer',
  'close.title': 'Fermer sans enregistrer ?',
  'close.body': '« {name} » contient des modifications non enregistrées. Elles seront perdues.',
  'clear.title': 'Tout effacer ?',
  'clear.body': 'Tous les documents ouverts seront fermés et supprimés de la mémoire et du stockage du navigateur. Les modifications non enregistrées seront perdues.',
  'clear.ok': 'Effacer',
  'clear.done': 'Tout a été effacé',

  'status.counts': 'Mots : {words} · Caractères : {chars} · Lignes : {lines} · ~{minutes} min de lecture',
  'status.blocked': 'Bloqués par la protection : {n}',
  'status.dangers': 'Dangereux : {n}',
  'status.warnings': 'Suspects : {n}',
  'status.missing': 'Fichiers manquants : {n}',
  'status.details': 'Afficher les détails',
  'status.private': 'Uniquement dans votre navigateur',
  'status.privateTitle': 'Les documents ne quittent jamais votre navigateur : le site n’a aucun serveur pour les recevoir, et sa politique de sécurité interdit les requêtes réseau.',

  'issues.title': 'Ressources externes et vérification des menaces',
  'issues.danger': 'Dangereux — bloqué',
  'issues.warn': 'Suspect',
  'issues.blocked': 'Bloqué par le mode de protection',
  'issues.missing': 'Fichier local introuvable',
  'issues.unsupported': 'Non pris en charge',
  'issues.note': 'Il s’agit d’une vérification légère : des heuristiques exécutées dans le navigateur, sans envoyer d’adresses à un service en ligne. Ce n’est pas un antivirus.',

  'link.title': 'Lien suspect',
  'link.found': 'La vérification légère a détecté des signaux d’alerte :',
  'link.address': 'Adresse :',
  'link.note': 'Il s’agit d’une heuristique, pas d’un antivirus. Ne l’ouvrez que si vous faites confiance à la source.',
  'link.open': 'Ouvrir quand même',

  'files.opened': 'Documents ouverts : {n}',
  'files.media': 'fichiers multimédias : {n}',
  'files.skipped': 'ignorés : {n} ({names})',
  'files.readError': 'Impossible de lire les fichiers : {error}',
  'files.tooLarge': 'Le fichier « {name} » est trop volumineux (plus de 20 Mo)',
  'files.notText': 'Le fichier « {name} » ne semble pas être un fichier texte',
  'save.done': 'Enregistré : {name} (dans le dossier de téléchargements du navigateur)',
  'export.done': 'Exporté : {name}',
  'render.error': 'Erreur d’affichage : {error}',

  'editor.placeholder': 'Commencez à écrire en Markdown ou déposez des fichiers ici…',
  'editor.aria': 'Éditeur Markdown',
  'preview.frameTitle': 'Aperçu du document',

  'tb.undo': 'Annuler (Ctrl+Z)',
  'tb.redo': 'Rétablir (Ctrl+Y)',
  'tb.heading': 'Titre',
  'tb.normal': 'Texte normal',
  'tb.headingN': 'Titre {n}',
  'tb.bold': 'Gras (Ctrl+B)',
  'tb.italic': 'Italique (Ctrl+I)',
  'tb.strike': 'Barré',
  'tb.link': 'Lien (Ctrl+K)',
  'tb.image': 'Image',
  'tb.bullets': 'Liste à puces',
  'tb.numbers': 'Liste numérotée',
  'tb.tasks': 'Liste de tâches',
  'tb.quote': 'Citation',
  'tb.code': 'Code en ligne',
  'tb.codeBlock': 'Bloc de code',
  'tb.table': 'Tableau',
  'tb.rule': 'Ligne horizontale',
  'tb.advanced': 'Éditeur avancé',
  'tb.headings46': 'Titres 4 à 6',
  'tb.highlight': 'Surlignage ==texte==',
  'tb.sup': 'Exposant x^2^',
  'tb.sub': 'Indice H~2~O',
  'tb.kbd': 'Touche <kbd>',
  'tb.footnote': 'Note de bas de page',
  'tb.details': 'Section repliable (spoiler)',
  'tb.alert': 'Encadré',
  'tb.alertNote': 'Remarque',
  'tb.alertTip': 'Astuce',
  'tb.alertImportant': 'Important',
  'tb.alertWarning': 'Avertissement',
  'tb.alertCaution': 'Attention',
  'tb.math': 'Formule mathématique',
  'tb.mermaid': 'Diagramme Mermaid',
  'tb.toc': 'Table des matières',
  'tb.tocEmpty': 'Le document ne contient aucun titre pour créer une table des matières',
  'tb.indent': 'Augmenter le retrait',
  'tb.outdent': 'Diminuer le retrait',
  'tb.find': 'Rechercher et remplacer (Ctrl+F)',
  'tb.lineNumbers': 'Numéros de ligne',
  'tb.wrap': 'Retour à la ligne',

  'snip.text': 'texte',
  'snip.description': 'description',
  'snip.linkText': 'texte du lien',
  'snip.column': 'Colonne {n}',
  'snip.cell': 'cellule',
  'snip.code': 'code',
  'snip.detailsTitle': 'Titre',
  'snip.detailsBody': 'Contenu masqué',
  'snip.alertText': 'Texte du message',
  'snip.contents': 'Sommaire',
  'snip.mmdStart': 'Début',
  'snip.mmdCondition': 'Condition',
  'snip.mmdYes': 'Oui',
  'snip.mmdNo': 'Non',
  'snip.mmdResult': 'Résultat',
  'snip.mmdOther': 'Autre chemin',

  'md.note': 'Remarque',
  'md.tip': 'Astuce',
  'md.important': 'Important',
  'md.warning': 'Avertissement',
  'md.caution': 'Attention',
  'md.frontMatter': 'Métadonnées (front matter)',
  'media.image': 'image',
  'media.audio': 'audio',
  'media.video': 'vidéo',
  'pv.link': 'lien',
  'pv.embed': 'page intégrée',
  'pv.embedReason': 'L’intégration de pages et de lecteurs tiers n’est pas prise en charge',
  'pv.embedTitle': 'Page intégrée non prise en charge',
  'pv.badgeDanger': 'Bloqué (vérification légère) :',
  'pv.badgeWarn': 'Suspect (vérification légère) :',
  'pv.empty': 'Référence vide',
  'pv.dangerSource': 'Source dangereuse bloquée',
  'pv.blockedImage': 'Image externe bloquée — activez « {hint} »',
  'pv.blockedMedia': 'Audio ou vidéo externe bloqué — activez « {hint} »',
  'pv.localMissing': 'Fichier local introuvable : {path}',
  'pv.localMissingHint': 'Déposez-le avec le document, ou déposez le dossier entier',
  'pv.fileBlocked': 'Fichier « {name} » bloqué',
  'pv.noSource': 'Aucune source multimédia',
  'pv.openDoc': 'Ouvrir le document {path}',
  'pv.localLink': 'Le fichier local « {path} » n’est pas ouvert — déposez-le avec le document',
  'pv.linkBlocked': 'Lien bloqué : {url}',
  'pv.linksDisabled': 'Les liens sont désactivés (protection totale) : {url}\nActivez « {hint} » pour les suivre.',
  'pv.diagram': 'Diagramme',
  'pv.diagramError': 'Erreur dans le diagramme : {error}',

  'url.bidi': 'L’adresse contient des caractères invisibles de sens d’écriture — une astuce pour déguiser des noms de fichiers',
  'url.control': 'L’adresse contient des caractères de contrôle — une astuce pour contourner les filtres',
  'url.data': 'Les données intégrées (data:) de ce type peuvent contenir du code exécutable',
  'url.invalid': 'Adresse non valide',
  'url.scheme': 'Type d’adresse non autorisé « {scheme}: » — il peut exécuter du code ou ouvrir des fichiers locaux',
  'url.credentials': 'L’adresse cache un identifiant ou un mot de passe (user@host) — une technique d’hameçonnage classique : le vrai site est la partie après le « @ »',
  'url.localLink': 'Adresse du réseau local (routeur, NAS, localhost)',
  'url.localMedia': 'Le chargement depuis le réseau local est interdit : le document pourrait sonder les appareils de votre réseau',
  'url.ip': 'Adresse IP au lieu d’un nom de domaine',
  'url.unknownTld': 'Domaine de premier niveau inconnu « .{tld} »',
  'url.scamTld': 'Le domaine « .{tld} » est souvent utilisé pour des arnaques',
  'url.mixed': 'Le domaine « {host} » mélange plusieurs alphabets — il imite peut-être un site connu',
  'url.idn': 'Nom de domaine internationalisé « {host} » — vérifiez qu’il n’imite pas une adresse similaire',
  'url.shortener': 'Raccourcisseur de liens — la vraie destination est masquée',
  'url.subdomains': 'Trop de sous-domaines — une astuce pour déguiser la vraie adresse',
  'url.port': 'Port non standard {port}',
  'url.http': 'Connexion non chiffrée (http://) — le contenu peut être modifié en chemin',
  'url.doubleExt': 'Double extension « {name} » — un exécutable déguisé en document',
  'url.executable': 'Pointe vers un exécutable ou un document contenant des macros (.{ext})',
  'url.long': 'Adresse très longue',
  'url.encoded': 'Adresse fortement encodée — elle cache peut-être son contenu',
  'url.textMismatch': 'Le texte du lien affiche « {shown} », mais il mène à « {host} »',

  'filecheck.disguised': 'Le fichier « {name} » se fait passer pour un média, mais il s’agit en réalité d’{what}',
  'filecheck.unknown': 'Impossible d’identifier le format de « {name} » à partir de son contenu',
  'filecheck.mismatch': 'L’extension de « {name} » ne correspond pas à son contenu ({detected})',
  'filecheck.svgActive': 'Le SVG « {name} » contient du contenu actif (scripts ou HTML intégré). Il est affiché comme une simple image, où le navigateur ne l’exécute jamais',
  'what.exe': 'un exécutable Windows',
  'what.elf': 'un exécutable Linux',
  'what.macho': 'un exécutable macOS',
  'what.script': 'un script',
  'what.html': 'une page web',
  'what.zip': 'une archive ZIP (ou un document Office)',
  'what.rar': 'une archive RAR',
  'what.7z': 'une archive 7z',
  'what.ole': 'un ancien document Office (peut contenir des macros)',
  'what.pdf': 'un document PDF',

  'sample.name': 'Bienvenue.md',
  'sample.body': `# Markdown Preview Editor

Un éditeur **Markdown** avec aperçu qui fonctionne *uniquement dans votre navigateur*.
Les documents ne sont jamais envoyés nulle part — ni à ce site, ni à qui que ce soit.

> [!TIP]
> Déposez un fichier \`.md\`, plusieurs fichiers ou un dossier entier sur la **moitié gauche de la fenêtre** : ils s’ouvrent dans des onglets.
> Les images déposées avec un document sont prises en compte automatiquement.

## Fonctionnalités

- [x] Aperçu en direct et défilement synchronisé
- [x] Tableaux, listes de tâches, notes de bas de page[^1], ==surlignage==, H~2~O et x^2^
- [x] Coloration du code, formules et diagrammes
- [ ] Envoyer vos données quelque part — **jamais**

| Mode | Liens externes | Images externes |
| :--- | :---: | :---: |
| Protection totale | inactifs | non chargées |
| Avec autorisations | vérifiés | vérifiées |

## Code

\`\`\`typescript
function greet(name: string): string {
  return \`Bonjour, \${name} !\`;
}
\`\`\`

## Formules

Identité d’Euler : $e^{i\\pi} + 1 = 0$

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}
$$

## Diagrammes

\`\`\`mermaid
flowchart LR
    A[Fichier .md] --> B(Navigateur)
    B --> C{Ressources externes ?}
    C -->|Protection totale| D[Bloquées]
    C -->|Autorisées| E[Vérification des menaces]
\`\`\`

## La protection en action

Cette image se trouve sur un serveur externe, elle n’est donc pas chargée en mode *Protection totale* :

![Image externe](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)

Ce lien reste inactif tant que « Autoriser les liens » n’est pas activé : [CommonMark](https://commonmark.org/).

Et ce lien est suspect — son texte affiche une adresse, mais il mène à une autre : [https://bank.example.com](https://bank-example.xyz/login).

---

Raccourcis : <kbd>Ctrl</kbd>+<kbd>B</kbd> gras, <kbd>Ctrl</kbd>+<kbd>I</kbd> italique, <kbd>Ctrl</kbd>+<kbd>K</kbd> lien, <kbd>Ctrl</kbd>+<kbd>S</kbd> enregistrer, <kbd>Ctrl</kbd>+<kbd>O</kbd> ouvrir, <kbd>Ctrl</kbd>+<kbd>F</kbd> rechercher.

[^1]: Voici à quoi ressemble une note de bas de page.
`,
};

export default fr;
