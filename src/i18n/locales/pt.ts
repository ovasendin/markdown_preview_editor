import type { Messages } from '../index';

const pt: Messages = {
  'app.framed': 'Este site não pode ser aberto dentro de outra página.',

  'header.viewMode': 'Modo de exibição',
  'view.editor': 'Editor',
  'view.split': 'Dividido',
  'view.preview': 'Visualização',
  'theme.toggle': 'Alternar tema',
  'theme.light': 'Tema claro',
  'theme.dark': 'Tema escuro',
  'settings.title': 'Configurações',
  'file.open': 'Abrir',
  'file.openTitle': 'Abrir arquivos (Ctrl+O)',
  'file.folder': 'Pasta',
  'file.folderTitle': 'Abrir uma pasta com documentos e imagens',
  'file.save': 'Salvar',
  'file.saveTitle': 'Salvar .md (Ctrl+S)',
  'file.html': 'HTML',
  'file.htmlTitle': 'Exportar para um arquivo HTML independente',
  'file.print': 'Imprimir',
  'file.printTitle': 'Imprimir ou salvar como PDF',
  'menu.title': 'Menu',
  'menu.folder': 'Abrir pasta',
  'menu.save': 'Salvar como .md',
  'menu.html': 'Exportar para HTML',
  'menu.print': 'Imprimir / salvar como PDF',

  'pane.editor': 'Editor',
  'pane.preview': 'Visualização',
  'pane.resize': 'Redimensionar painéis',
  'toolbar.formatting': 'Formatação',
  'drop.title': 'Solte para abrir',
  'drop.hint1': '.md, .txt, imagens, áudio, vídeo ou uma pasta inteira.',
  'drop.hint2': 'Os arquivos são lidos apenas no seu navegador e nunca são enviados.',
  'drop.wrongPlace': 'Solte os arquivos sobre o editor (lado esquerdo da janela)',

  'prot.panel': 'Proteção',
  'prot.full': 'Proteção total',
  'prot.fullDesc': 'O documento não pode acessar a rede: links externos ficam inativos; imagens, áudio e vídeo externos não são carregados.',
  'prot.permissions': 'Permissões',
  'prot.links': 'Permitir links',
  'prot.linksDesc': 'Abrem em uma nova aba sem revelar o endereço desta página. Os suspeitos, só após confirmação.',
  'prot.images': 'Permitir imagens externas',
  'prot.imagesDesc': 'O servidor da imagem verá seu endereço IP e quando você abriu o documento.',
  'prot.media': 'Permitir áudio e vídeo externos',
  'prot.mediaDesc': 'Controles padrão do player, nunca reprodução automática.',
  'prot.checkTitle': 'Verificação leve de ameaças.',
  'prot.checkText': 'Links e mídias também são verificados por heurísticas: truques de phishing, domínios que imitam outros sites, executáveis, endereços da rede local. Itens perigosos são sempre bloqueados. Isto não é um antivírus.',
  'prot.localNote': 'Imagens e mídias soltas junto com um documento são sempre exibidas — elas não precisam de rede. As permissões são redefinidas quando a página é recarregada.',
  'prot.relaxed': 'Proteção reduzida',
  'prot.fullTooltip': 'Proteção total: o documento não pode acessar a rede',
  'prot.allowed': 'Permitido: {list}',
  'prot.listLinks': 'links',
  'prot.listImages': 'imagens',
  'prot.listMedia': 'áudio e vídeo',
  'prot.enableHint': 'Para reduzir a proteção, ative uma das permissões abaixo',

  'settings.language': 'Idioma',
  'settings.languageAuto': 'Idioma do navegador',
  'settings.sync': 'Rolagem sincronizada',
  'settings.remember': 'Lembrar documentos neste navegador',
  'settings.rememberOn': 'Ativado: o texto dos documentos abertos é guardado neste navegador (sem imagens). Desative em computadores compartilhados.',
  'settings.rememberOff': 'Desativado: fechar a aba do navegador apaga tudo. Ative apenas no seu computador pessoal.',
  'settings.clear': 'Limpar tudo',
  'settings.clearNote': 'Fecha todos os documentos e os remove da memória e do armazenamento do navegador.',
  'settings.privacy': 'Todos os documentos são processados apenas no seu navegador. O site não tem ferramentas de análise e nunca se comunica com servidores de terceiros.',

  'tab.untitled': 'Sem título {n}.md',
  'tab.close': 'Fechar',
  'tab.closeNamed': 'Fechar {name}',
  'tab.new': 'Novo documento',
  'dialog.cancel': 'Cancelar',
  'dialog.close': 'Fechar',
  'close.title': 'Fechar sem salvar?',
  'close.body': '"{name}" tem alterações não salvas. Elas serão perdidas.',
  'clear.title': 'Limpar tudo?',
  'clear.body': 'Todos os documentos abertos serão fechados e removidos da memória e do armazenamento do navegador. As alterações não salvas serão perdidas.',
  'clear.ok': 'Limpar',
  'clear.done': 'Tudo foi limpo',

  'status.counts': 'Palavras: {words} · Caracteres: {chars} · Linhas: {lines} · ~{minutes} min de leitura',
  'status.blocked': 'Bloqueados pela proteção: {n}',
  'status.dangers': 'Perigosos: {n}',
  'status.warnings': 'Suspeitos: {n}',
  'status.missing': 'Arquivos ausentes: {n}',
  'status.details': 'Mostrar detalhes',
  'status.private': 'Somente no seu navegador',
  'status.privateTitle': 'Os documentos nunca saem do seu navegador: o site não tem servidor para recebê-los, e a política de segurança dele proíbe requisições de rede.',

  'issues.title': 'Recursos externos e verificação de ameaças',
  'issues.danger': 'Perigoso — bloqueado',
  'issues.warn': 'Suspeito',
  'issues.blocked': 'Bloqueado pelo modo de proteção',
  'issues.missing': 'Arquivo local não encontrado',
  'issues.unsupported': 'Não suportado',
  'issues.note': 'Esta é uma verificação leve: heurísticas executadas no navegador, sem enviar endereços a nenhum serviço online. Não é um antivírus.',

  'link.title': 'Link suspeito',
  'link.found': 'A verificação leve encontrou sinais de alerta:',
  'link.address': 'Endereço:',
  'link.note': 'Isto é uma heurística, não um antivírus. Abra apenas se confiar na fonte.',
  'link.open': 'Abrir mesmo assim',

  'files.opened': 'Documentos abertos: {n}',
  'files.media': 'arquivos de mídia: {n}',
  'files.skipped': 'ignorados: {n} ({names})',
  'files.readError': 'Não foi possível ler os arquivos: {error}',
  'files.tooLarge': 'O arquivo "{name}" é grande demais (mais de 20 MB)',
  'files.notText': 'O arquivo "{name}" não parece ser um arquivo de texto',
  'save.done': 'Salvo: {name} (na pasta de downloads do navegador)',
  'export.done': 'Exportado: {name}',
  'render.error': 'Erro de exibição: {error}',

  'editor.placeholder': 'Comece a escrever em Markdown ou solte arquivos aqui…',
  'editor.aria': 'Editor de Markdown',
  'preview.frameTitle': 'Visualização do documento',

  'tb.undo': 'Desfazer (Ctrl+Z)',
  'tb.redo': 'Refazer (Ctrl+Y)',
  'tb.heading': 'Título',
  'tb.normal': 'Texto normal',
  'tb.headingN': 'Título {n}',
  'tb.bold': 'Negrito (Ctrl+B)',
  'tb.italic': 'Itálico (Ctrl+I)',
  'tb.strike': 'Tachado',
  'tb.link': 'Link (Ctrl+K)',
  'tb.image': 'Imagem',
  'tb.bullets': 'Lista com marcadores',
  'tb.numbers': 'Lista numerada',
  'tb.tasks': 'Lista de tarefas',
  'tb.quote': 'Citação',
  'tb.code': 'Código embutido',
  'tb.codeBlock': 'Bloco de código',
  'tb.table': 'Tabela',
  'tb.rule': 'Linha horizontal',
  'tb.advanced': 'Editor avançado',
  'tb.headings46': 'Títulos 4–6',
  'tb.highlight': 'Destaque ==texto==',
  'tb.sup': 'Sobrescrito x^2^',
  'tb.sub': 'Subscrito H~2~O',
  'tb.kbd': 'Tecla <kbd>',
  'tb.footnote': 'Nota de rodapé',
  'tb.details': 'Seção recolhível (spoiler)',
  'tb.alert': 'Aviso',
  'tb.alertNote': 'Nota',
  'tb.alertTip': 'Dica',
  'tb.alertImportant': 'Importante',
  'tb.alertWarning': 'Atenção',
  'tb.alertCaution': 'Cuidado',
  'tb.math': 'Fórmula matemática',
  'tb.mermaid': 'Diagrama Mermaid',
  'tb.toc': 'Sumário',
  'tb.tocEmpty': 'O documento não tem títulos para criar um sumário',
  'tb.indent': 'Aumentar recuo',
  'tb.outdent': 'Diminuir recuo',
  'tb.find': 'Localizar e substituir (Ctrl+F)',
  'tb.lineNumbers': 'Números de linha',
  'tb.wrap': 'Quebra de linha',

  'snip.text': 'texto',
  'snip.description': 'descrição',
  'snip.linkText': 'texto do link',
  'snip.column': 'Coluna {n}',
  'snip.cell': 'célula',
  'snip.code': 'código',
  'snip.detailsTitle': 'Título',
  'snip.detailsBody': 'Conteúdo oculto',
  'snip.alertText': 'Texto da mensagem',
  'snip.contents': 'Sumário',
  'snip.mmdStart': 'Início',
  'snip.mmdCondition': 'Condição',
  'snip.mmdYes': 'Sim',
  'snip.mmdNo': 'Não',
  'snip.mmdResult': 'Resultado',
  'snip.mmdOther': 'Outro caminho',

  'md.note': 'Nota',
  'md.tip': 'Dica',
  'md.important': 'Importante',
  'md.warning': 'Atenção',
  'md.caution': 'Cuidado',
  'md.frontMatter': 'Metadados (front matter)',
  'media.image': 'imagem',
  'media.audio': 'áudio',
  'media.video': 'vídeo',
  'pv.link': 'link',
  'pv.embed': 'página incorporada',
  'pv.embedReason': 'Incorporar páginas e players de terceiros não é suportado',
  'pv.embedTitle': 'Página incorporada não suportada',
  'pv.badgeDanger': 'Bloqueado (verificação leve):',
  'pv.badgeWarn': 'Suspeito (verificação leve):',
  'pv.empty': 'Referência vazia',
  'pv.dangerSource': 'Fonte perigosa bloqueada',
  'pv.blockedImage': 'Imagem externa bloqueada — ative "{hint}"',
  'pv.blockedMedia': 'Áudio ou vídeo externo bloqueado — ative "{hint}"',
  'pv.localMissing': 'Arquivo local não encontrado: {path}',
  'pv.localMissingHint': 'Solte-o junto com o documento ou solte a pasta inteira',
  'pv.fileBlocked': 'Arquivo "{name}" bloqueado',
  'pv.noSource': 'Nenhuma fonte de mídia',
  'pv.openDoc': 'Abrir o documento {path}',
  'pv.localLink': 'O arquivo local "{path}" não está aberto — solte-o junto com o documento',
  'pv.linkBlocked': 'Link bloqueado: {url}',
  'pv.linksDisabled': 'Os links estão desativados (proteção total): {url}\nAtive "{hint}" para segui-los.',
  'pv.diagram': 'Diagrama',
  'pv.diagramError': 'Erro no diagrama: {error}',

  'url.bidi': 'O endereço contém caracteres invisíveis de direção do texto — um truque para disfarçar nomes de arquivo',
  'url.control': 'O endereço contém caracteres de controle — um truque para burlar filtros',
  'url.data': 'Dados embutidos (data:) deste tipo podem conter código executável',
  'url.invalid': 'Endereço inválido',
  'url.scheme': 'Tipo de endereço não permitido "{scheme}:" — pode executar código ou abrir arquivos locais',
  'url.credentials': 'O endereço esconde um usuário ou senha (user@host) — um truque clássico de phishing: o site real é a parte depois do "@"',
  'url.localLink': 'Endereço da rede local (roteador, NAS, localhost)',
  'url.localMedia': 'Carregar da rede local é proibido: o documento poderia sondar dispositivos da sua rede',
  'url.ip': 'Endereço IP em vez de nome de domínio',
  'url.unknownTld': 'Domínio de primeiro nível desconhecido ".{tld}"',
  'url.scamTld': 'O domínio ".{tld}" é usado com frequência em golpes',
  'url.mixed': 'O domínio "{host}" mistura alfabetos — pode estar imitando um site conhecido',
  'url.idn': 'Domínio internacionalizado "{host}" — confira se não imita um endereço parecido',
  'url.shortener': 'Encurtador de links — o destino real está oculto',
  'url.subdomains': 'Subdomínios demais — um truque para disfarçar o endereço real',
  'url.port': 'Porta não padrão {port}',
  'url.http': 'Conexão sem criptografia (http://) — o conteúdo pode ser alterado no caminho',
  'url.doubleExt': 'Extensão dupla "{name}" — um executável disfarçado de documento',
  'url.executable': 'Aponta para um executável ou um documento com macros (.{ext})',
  'url.long': 'Endereço muito longo',
  'url.encoded': 'Endereço muito codificado — pode estar escondendo o conteúdo',
  'url.textMismatch': 'O texto do link mostra "{shown}", mas ele leva a "{host}"',

  'filecheck.disguised': 'O arquivo "{name}" se passa por mídia, mas na verdade é {what}',
  'filecheck.unknown': 'Não foi possível identificar o formato de "{name}" pelo conteúdo',
  'filecheck.mismatch': 'A extensão de "{name}" não corresponde ao conteúdo ({detected})',
  'filecheck.svgActive': 'O SVG "{name}" contém conteúdo ativo (scripts ou HTML incorporado). Ele é exibido como uma imagem comum, onde o navegador nunca o executa',
  'what.exe': 'um executável do Windows',
  'what.elf': 'um executável do Linux',
  'what.macho': 'um executável do macOS',
  'what.script': 'um script',
  'what.html': 'uma página da web',
  'what.zip': 'um arquivo ZIP (ou documento do Office)',
  'what.rar': 'um arquivo RAR',
  'what.7z': 'um arquivo 7z',
  'what.ole': 'um documento antigo do Office (pode conter macros)',
  'what.pdf': 'um documento PDF',

  'sample.name': 'Bem-vindo.md',
  'sample.body': `# Markdown Preview Editor

Um editor de **Markdown** com visualização que funciona *somente dentro do seu navegador*.
Os documentos nunca são enviados a lugar nenhum — nem a este site, nem a ninguém.

> [!TIP]
> Solte um arquivo \`.md\`, vários arquivos ou uma pasta inteira na **metade esquerda da janela** — eles abrem em abas.
> Imagens soltas junto com um documento são incluídas automaticamente.

## Recursos

- [x] Visualização ao vivo e rolagem sincronizada
- [x] Tabelas, listas de tarefas, notas de rodapé[^1], ==destaque==, H~2~O e x^2^
- [x] Realce de código, fórmulas e diagramas
- [ ] Enviar seus dados para algum lugar — **nunca**

| Modo | Links externos | Imagens externas |
| :--- | :---: | :---: |
| Proteção total | inativos | não carregadas |
| Com permissões | verificados | verificadas |

## Código

\`\`\`typescript
function greet(name: string): string {
  return \`Olá, \${name}!\`;
}
\`\`\`

## Fórmulas

Identidade de Euler: $e^{i\\pi} + 1 = 0$

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}
$$

## Diagramas

\`\`\`mermaid
flowchart LR
    A[Arquivo .md] --> B(Navegador)
    B --> C{Recursos externos?}
    C -->|Proteção total| D[Bloqueados]
    C -->|Permitidos| E[Verificação de ameaças]
\`\`\`

## A proteção em ação

Esta imagem está em um servidor externo, por isso não é carregada no modo *Proteção total*:

![Imagem externa](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)

Este link fica inativo até que "Permitir links" seja ativado: [CommonMark](https://commonmark.org/).

E este link é suspeito — o texto mostra um endereço, mas ele leva a outro: [https://bank.example.com](https://bank-example.xyz/login).

---

Atalhos: <kbd>Ctrl</kbd>+<kbd>B</kbd> negrito, <kbd>Ctrl</kbd>+<kbd>I</kbd> itálico, <kbd>Ctrl</kbd>+<kbd>K</kbd> link, <kbd>Ctrl</kbd>+<kbd>S</kbd> salvar, <kbd>Ctrl</kbd>+<kbd>O</kbd> abrir, <kbd>Ctrl</kbd>+<kbd>F</kbd> localizar.

[^1]: É assim que fica uma nota de rodapé.
`,
};

export default pt;
