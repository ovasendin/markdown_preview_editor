import type { Messages } from '../index';

const es: Messages = {
  'app.framed': 'Este sitio no se puede abrir dentro de otra página.',

  'header.viewMode': 'Modo de vista',
  'view.editor': 'Editor',
  'view.split': 'Dividido',
  'view.preview': 'Vista previa',
  'theme.toggle': 'Cambiar tema',
  'theme.light': 'Tema claro',
  'theme.dark': 'Tema oscuro',
  'settings.title': 'Ajustes',
  'file.open': 'Abrir',
  'file.openTitle': 'Abrir archivos (Ctrl+O)',
  'file.folder': 'Carpeta',
  'file.folderTitle': 'Abrir una carpeta con documentos e imágenes',
  'file.save': 'Guardar',
  'file.saveTitle': 'Guardar .md (Ctrl+S)',
  'file.html': 'HTML',
  'file.htmlTitle': 'Exportar a un archivo HTML independiente',
  'file.print': 'Imprimir',
  'file.printTitle': 'Imprimir o guardar como PDF',
  'menu.title': 'Menú',
  'menu.folder': 'Abrir carpeta',
  'menu.save': 'Guardar como .md',
  'menu.html': 'Exportar a HTML',
  'menu.print': 'Imprimir / guardar como PDF',

  'pane.editor': 'Editor',
  'pane.preview': 'Vista previa',
  'pane.resize': 'Cambiar el tamaño de los paneles',
  'toolbar.formatting': 'Formato',
  'drop.title': 'Suelta para abrir',
  'drop.hint1': '.md, .txt, imágenes, audio, vídeo o una carpeta completa.',
  'drop.hint2': 'Los archivos solo se leen en tu navegador y nunca se suben.',
  'drop.wrongPlace': 'Suelta los archivos sobre el editor (parte izquierda de la ventana)',

  'prot.panel': 'Protección',
  'prot.full': 'Protección total',
  'prot.fullDesc': 'El documento no puede acceder a la red: los enlaces externos están inactivos y no se cargan imágenes, audio ni vídeo externos.',
  'prot.permissions': 'Permisos',
  'prot.links': 'Permitir enlaces',
  'prot.linksDesc': 'Se abren en una pestaña nueva sin revelar la dirección de esta página. Los sospechosos, solo tras confirmar.',
  'prot.images': 'Permitir imágenes externas',
  'prot.imagesDesc': 'El servidor de la imagen verá tu dirección IP y cuándo abriste el documento.',
  'prot.media': 'Permitir audio y vídeo externos',
  'prot.mediaDesc': 'Controles de reproductor estándar, nunca reproducción automática.',
  'prot.checkTitle': 'Comprobación ligera de amenazas.',
  'prot.checkText': 'Los enlaces y el contenido multimedia también se revisan con heurísticas: trucos de phishing, dominios que imitan a otros, ejecutables, direcciones de la red local. Lo peligroso se bloquea siempre. No es un antivirus.',
  'prot.localNote': 'Las imágenes y el contenido multimedia soltados junto con un documento se muestran siempre: no necesitan red. Los permisos se restablecen al recargar la página.',
  'prot.relaxed': 'Protección reducida',
  'prot.fullTooltip': 'Protección total: el documento no puede acceder a la red',
  'prot.allowed': 'Permitido: {list}',
  'prot.listLinks': 'enlaces',
  'prot.listImages': 'imágenes',
  'prot.listMedia': 'audio y vídeo',
  'prot.enableHint': 'Para reducir la protección, activa uno de los permisos de abajo',

  'settings.language': 'Idioma',
  'settings.languageAuto': 'Idioma del navegador',
  'settings.sync': 'Desplazamiento sincronizado',
  'settings.remember': 'Recordar documentos en este navegador',
  'settings.rememberOn': 'Activado: el texto de los documentos abiertos se guarda en este navegador (sin imágenes). Desactívalo en ordenadores compartidos.',
  'settings.rememberOff': 'Desactivado: al cerrar la pestaña del navegador se borra todo. Actívalo solo en tu ordenador personal.',
  'settings.clear': 'Borrar todo',
  'settings.clearNote': 'Cierra todos los documentos y los elimina de la memoria y del almacenamiento del navegador.',
  'settings.privacy': 'Todos los documentos se procesan únicamente en tu navegador. El sitio no tiene analíticas y nunca contacta con servidores de terceros.',

  'tab.untitled': 'Sin título {n}.md',
  'tab.close': 'Cerrar',
  'tab.closeNamed': 'Cerrar {name}',
  'tab.new': 'Nuevo documento',
  'dialog.cancel': 'Cancelar',
  'dialog.close': 'Cerrar',
  'close.title': '¿Cerrar sin guardar?',
  'close.body': '«{name}» tiene cambios sin guardar. Se perderán.',
  'clear.title': '¿Borrar todo?',
  'clear.body': 'Todos los documentos abiertos se cerrarán y se eliminarán de la memoria y del almacenamiento del navegador. Los cambios sin guardar se perderán.',
  'clear.ok': 'Borrar',
  'clear.done': 'Todo borrado',

  'status.counts': 'Palabras: {words} · Caracteres: {chars} · Líneas: {lines} · ~{minutes} min de lectura',
  'status.blocked': 'Bloqueados por la protección: {n}',
  'status.dangers': 'Peligrosos: {n}',
  'status.warnings': 'Sospechosos: {n}',
  'status.missing': 'Archivos que faltan: {n}',
  'status.details': 'Ver detalles',
  'status.private': 'Solo en tu navegador',
  'status.privateTitle': 'Los documentos nunca salen de tu navegador: el sitio no tiene ningún servidor que pueda recibirlos y su política de seguridad prohíbe las peticiones de red.',

  'issues.title': 'Recursos externos y comprobación de amenazas',
  'issues.danger': 'Peligroso: bloqueado',
  'issues.warn': 'Sospechoso',
  'issues.blocked': 'Bloqueado por el modo de protección',
  'issues.missing': 'Archivo local no encontrado',
  'issues.unsupported': 'No compatible',
  'issues.note': 'Es una comprobación ligera: heurísticas que se ejecutan en el navegador, sin enviar direcciones a ningún servicio en línea. No es un antivirus.',

  'link.title': 'Enlace sospechoso',
  'link.found': 'La comprobación ligera encontró señales de alerta:',
  'link.address': 'Dirección:',
  'link.note': 'Es una heurística, no un antivirus. Ábrelo solo si confías en la fuente.',
  'link.open': 'Abrir de todos modos',

  'files.opened': 'Documentos abiertos: {n}',
  'files.media': 'archivos multimedia: {n}',
  'files.skipped': 'omitidos: {n} ({names})',
  'files.readError': 'No se pudieron leer los archivos: {error}',
  'files.tooLarge': 'El archivo «{name}» es demasiado grande (más de 20 MB)',
  'files.notText': 'El archivo «{name}» no parece un archivo de texto',
  'save.done': 'Guardado: {name} (en la carpeta de descargas del navegador)',
  'export.done': 'Exportado: {name}',
  'render.error': 'Error al mostrar el documento: {error}',

  'editor.placeholder': 'Empieza a escribir Markdown o suelta archivos aquí…',
  'editor.aria': 'Editor de Markdown',
  'preview.frameTitle': 'Vista previa del documento',

  'tb.undo': 'Deshacer (Ctrl+Z)',
  'tb.redo': 'Rehacer (Ctrl+Y)',
  'tb.heading': 'Encabezado',
  'tb.normal': 'Texto normal',
  'tb.headingN': 'Encabezado {n}',
  'tb.bold': 'Negrita (Ctrl+B)',
  'tb.italic': 'Cursiva (Ctrl+I)',
  'tb.strike': 'Tachado',
  'tb.link': 'Enlace (Ctrl+K)',
  'tb.image': 'Imagen',
  'tb.bullets': 'Lista con viñetas',
  'tb.numbers': 'Lista numerada',
  'tb.tasks': 'Lista de tareas',
  'tb.quote': 'Cita',
  'tb.code': 'Código en línea',
  'tb.codeBlock': 'Bloque de código',
  'tb.table': 'Tabla',
  'tb.rule': 'Línea horizontal',
  'tb.advanced': 'Editor avanzado',
  'tb.headings46': 'Encabezados 4–6',
  'tb.highlight': 'Resaltado ==texto==',
  'tb.sup': 'Superíndice x^2^',
  'tb.sub': 'Subíndice H~2~O',
  'tb.kbd': 'Tecla <kbd>',
  'tb.footnote': 'Nota al pie',
  'tb.details': 'Sección desplegable (spoiler)',
  'tb.alert': 'Aviso',
  'tb.alertNote': 'Nota',
  'tb.alertTip': 'Consejo',
  'tb.alertImportant': 'Importante',
  'tb.alertWarning': 'Advertencia',
  'tb.alertCaution': 'Precaución',
  'tb.math': 'Fórmula matemática',
  'tb.mermaid': 'Diagrama Mermaid',
  'tb.toc': 'Índice',
  'tb.tocEmpty': 'El documento no tiene encabezados para crear un índice',
  'tb.indent': 'Aumentar sangría',
  'tb.outdent': 'Reducir sangría',
  'tb.find': 'Buscar y reemplazar (Ctrl+F)',
  'tb.lineNumbers': 'Números de línea',
  'tb.wrap': 'Ajuste de línea',

  'snip.text': 'texto',
  'snip.description': 'descripción',
  'snip.linkText': 'texto del enlace',
  'snip.column': 'Columna {n}',
  'snip.cell': 'celda',
  'snip.code': 'código',
  'snip.detailsTitle': 'Título',
  'snip.detailsBody': 'Contenido oculto',
  'snip.alertText': 'Texto del mensaje',
  'snip.contents': 'Índice',
  'snip.mmdStart': 'Inicio',
  'snip.mmdCondition': 'Condición',
  'snip.mmdYes': 'Sí',
  'snip.mmdNo': 'No',
  'snip.mmdResult': 'Resultado',
  'snip.mmdOther': 'Otro camino',

  'md.note': 'Nota',
  'md.tip': 'Consejo',
  'md.important': 'Importante',
  'md.warning': 'Advertencia',
  'md.caution': 'Precaución',
  'md.frontMatter': 'Metadatos (front matter)',
  'media.image': 'imagen',
  'media.audio': 'audio',
  'media.video': 'vídeo',
  'pv.link': 'enlace',
  'pv.embed': 'página incrustada',
  'pv.embedReason': 'No se admite incrustar páginas ni reproductores de terceros',
  'pv.embedTitle': 'Página incrustada no compatible',
  'pv.badgeDanger': 'Bloqueado (comprobación ligera):',
  'pv.badgeWarn': 'Sospechoso (comprobación ligera):',
  'pv.empty': 'Referencia vacía',
  'pv.dangerSource': 'Fuente peligrosa bloqueada',
  'pv.blockedImage': 'Imagen externa bloqueada: activa «{hint}»',
  'pv.blockedMedia': 'Audio o vídeo externo bloqueado: activa «{hint}»',
  'pv.localMissing': 'Archivo local no encontrado: {path}',
  'pv.localMissingHint': 'Suéltalo junto con el documento o suelta la carpeta completa',
  'pv.fileBlocked': 'Archivo «{name}» bloqueado',
  'pv.noSource': 'Sin fuente multimedia',
  'pv.openDoc': 'Abrir el documento {path}',
  'pv.localLink': 'El archivo local «{path}» no está abierto: suéltalo junto con el documento',
  'pv.linkBlocked': 'Enlace bloqueado: {url}',
  'pv.linksDisabled': 'Los enlaces están desactivados (protección total): {url}\nActiva «{hint}» para seguirlos.',
  'pv.diagram': 'Diagrama',
  'pv.diagramError': 'Error en el diagrama: {error}',

  'url.bidi': 'La dirección contiene caracteres invisibles de dirección del texto: un truco para disfrazar nombres de archivo',
  'url.control': 'La dirección contiene caracteres de control: un truco para eludir filtros',
  'url.data': 'Los datos incrustados (data:) de este tipo pueden contener código ejecutable',
  'url.invalid': 'Dirección no válida',
  'url.scheme': 'Tipo de dirección no permitido «{scheme}:»: puede ejecutar código o abrir archivos locales',
  'url.credentials': 'La dirección oculta un usuario o contraseña (user@host): un truco clásico de phishing; el sitio real es lo que va después de la «@»',
  'url.localLink': 'Dirección de la red local (router, NAS, localhost)',
  'url.localMedia': 'No se permite cargar desde la red local: el documento podría sondear dispositivos de tu red',
  'url.ip': 'Dirección IP en lugar de un nombre de dominio',
  'url.unknownTld': 'Dominio de nivel superior desconocido «.{tld}»',
  'url.scamTld': 'El dominio «.{tld}» se usa con frecuencia para estafas',
  'url.mixed': 'El dominio «{host}» mezcla alfabetos: podría imitar a un sitio conocido',
  'url.idn': 'Dominio internacionalizado «{host}»: comprueba que no imite otra dirección parecida',
  'url.shortener': 'Acortador de enlaces: el destino real está oculto',
  'url.subdomains': 'Demasiados subdominios: un truco para disfrazar la dirección real',
  'url.port': 'Puerto no estándar {port}',
  'url.http': 'Conexión sin cifrar (http://): el contenido puede alterarse por el camino',
  'url.doubleExt': 'Doble extensión «{name}»: un ejecutable disfrazado de documento',
  'url.executable': 'Apunta a un ejecutable o a un documento con macros (.{ext})',
  'url.long': 'Dirección muy larga',
  'url.encoded': 'Dirección muy codificada: puede estar ocultando su contenido',
  'url.textMismatch': 'El texto del enlace muestra «{shown}», pero lleva a «{host}»',

  'filecheck.disguised': 'El archivo «{name}» se hace pasar por multimedia, pero en realidad es {what}',
  'filecheck.unknown': 'No se pudo identificar el formato de «{name}» a partir de su contenido',
  'filecheck.mismatch': 'La extensión de «{name}» no coincide con su contenido ({detected})',
  'filecheck.svgActive': 'El SVG «{name}» contiene contenido activo (scripts o HTML incrustado). Se muestra como una imagen normal, donde el navegador nunca lo ejecuta',
  'what.exe': 'un ejecutable de Windows',
  'what.elf': 'un ejecutable de Linux',
  'what.macho': 'un ejecutable de macOS',
  'what.script': 'un script',
  'what.html': 'una página web',
  'what.zip': 'un archivo ZIP (o un documento de Office)',
  'what.rar': 'un archivo RAR',
  'what.7z': 'un archivo 7z',
  'what.ole': 'un documento de Office antiguo (puede contener macros)',
  'what.pdf': 'un documento PDF',

  'sample.name': 'Bienvenida.md',
  'sample.body': `# Markdown Preview Editor

Un editor de **Markdown** con vista previa que funciona *solo dentro de tu navegador*.
Los documentos nunca se envían a ningún sitio: ni a esta web ni a nadie más.

> [!TIP]
> Suelta un archivo \`.md\`, varios archivos o una carpeta completa sobre la **mitad izquierda de la ventana**: se abrirán en pestañas.
> Las imágenes que sueltes junto con un documento se incorporan automáticamente.

## Funciones

- [x] Vista previa en directo y desplazamiento sincronizado
- [x] Tablas, listas de tareas, notas al pie[^1], ==resaltado==, H~2~O y x^2^
- [x] Resaltado de código, fórmulas y diagramas
- [ ] Enviar tus datos a algún sitio: **nunca**

| Modo | Enlaces externos | Imágenes externas |
| :--- | :---: | :---: |
| Protección total | inactivos | no se cargan |
| Con permisos | comprobados | comprobadas |

## Código

\`\`\`typescript
function greet(name: string): string {
  return \`¡Hola, \${name}!\`;
}
\`\`\`

## Fórmulas

Identidad de Euler: $e^{i\\pi} + 1 = 0$

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}
$$

## Diagramas

\`\`\`mermaid
flowchart LR
    A[Archivo .md] --> B(Navegador)
    B --> C{¿Recursos externos?}
    C -->|Protección total| D[Bloqueados]
    C -->|Permitidos| E[Comprobación de amenazas]
\`\`\`

## La protección en acción

Esta imagen está en un servidor externo, así que no se carga en el modo *Protección total*:

![Imagen externa](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)

Este enlace permanece inactivo hasta que actives «Permitir enlaces»: [CommonMark](https://commonmark.org/).

Y este enlace es sospechoso: su texto muestra una dirección, pero lleva a otra: [https://bank.example.com](https://bank-example.xyz/login).

---

Atajos: <kbd>Ctrl</kbd>+<kbd>B</kbd> negrita, <kbd>Ctrl</kbd>+<kbd>I</kbd> cursiva, <kbd>Ctrl</kbd>+<kbd>K</kbd> enlace, <kbd>Ctrl</kbd>+<kbd>S</kbd> guardar, <kbd>Ctrl</kbd>+<kbd>O</kbd> abrir, <kbd>Ctrl</kbd>+<kbd>F</kbd> buscar.

[^1]: Así se ve una nota al pie.
`,
};

export default es;
