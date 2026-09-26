import type { Messages } from '../index';

const tr: Messages = {
  'app.framed': 'Bu site başka bir sayfanın içinde açılamaz.',

  'header.viewMode': 'Görünüm modu',
  'view.editor': 'Düzenleyici',
  'view.split': 'Bölünmüş',
  'view.preview': 'Önizleme',
  'theme.toggle': 'Temayı değiştir',
  'theme.light': 'Açık tema',
  'theme.dark': 'Koyu tema',
  'settings.title': 'Ayarlar',
  'file.open': 'Aç',
  'file.openTitle': 'Dosyaları aç (Ctrl+O)',
  'file.folder': 'Klasör',
  'file.folderTitle': 'Belge ve görsel içeren bir klasör aç',
  'file.save': 'Kaydet',
  'file.saveTitle': '.md olarak kaydet (Ctrl+S)',
  'file.html': 'HTML',
  'file.htmlTitle': 'Bağımsız bir HTML dosyasına aktar',
  'file.print': 'Yazdır',
  'file.printTitle': 'Yazdır veya PDF olarak kaydet',

  'pane.editor': 'Düzenleyici',
  'pane.preview': 'Önizleme',
  'pane.resize': 'Panellerin boyutunu değiştir',
  'toolbar.formatting': 'Biçimlendirme',
  'drop.title': 'Açmak için bırakın',
  'drop.hint1': '.md, .txt, görseller, ses, video veya bütün bir klasör.',
  'drop.hint2': 'Dosyalar yalnızca tarayıcınızda okunur ve hiçbir yere yüklenmez.',
  'drop.wrongPlace': 'Dosyaları düzenleyicinin üzerine bırakın (pencerenin sol tarafı)',

  'prot.panel': 'Koruma',
  'prot.full': 'Tam koruma',
  'prot.fullDesc': 'Belge ağa erişemez: harici bağlantılar devre dışıdır; harici görseller, ses ve video yüklenmez.',
  'prot.permissions': 'İzinler',
  'prot.links': 'Bağlantılara izin ver',
  'prot.linksDesc': 'Bu sayfanın adresini açığa vurmadan yeni sekmede açılır. Şüpheli olanlar yalnızca onaydan sonra.',
  'prot.images': 'Harici görsellere izin ver',
  'prot.imagesDesc': 'Görselin sunucusu IP adresinizi ve belgeyi ne zaman açtığınızı görür.',
  'prot.media': 'Harici ses ve videoya izin ver',
  'prot.mediaDesc': 'Standart oynatıcı düğmeleri, asla otomatik oynatma yok.',
  'prot.checkTitle': 'Hafif tehdit denetimi.',
  'prot.checkText': 'Bağlantılar ve medya ayrıca sezgisel yöntemlerle denetlenir: kimlik avı hileleri, taklit alan adları, yürütülebilir dosyalar, yerel ağ adresleri. Tehlikeli öğeler her zaman engellenir. Bu bir antivirüs değildir.',
  'prot.localNote': 'Bir belgeyle birlikte bırakılan görseller ve medya her zaman gösterilir; ağa ihtiyaç duymazlar. Sayfa yeniden yüklendiğinde izinler sıfırlanır.',
  'prot.relaxed': 'Koruma gevşetildi',
  'prot.fullTooltip': 'Tam koruma: belge ağa erişemez',
  'prot.allowed': 'İzin verilenler: {list}',
  'prot.listLinks': 'bağlantılar',
  'prot.listImages': 'görseller',
  'prot.listMedia': 'ses ve video',
  'prot.enableHint': 'Korumayı gevşetmek için aşağıdaki izinlerden birini açın',

  'settings.language': 'Dil',
  'settings.languageAuto': 'Tarayıcı dili',
  'settings.sync': 'Eşzamanlı kaydırma',
  'settings.remember': 'Belgeleri bu tarayıcıda hatırla',
  'settings.rememberOn': 'Açık: açık belgelerin metni bu tarayıcıda saklanır (görseller hariç). Ortak kullanılan bilgisayarlarda kapatın.',
  'settings.rememberOff': 'Kapalı: tarayıcı sekmesini kapatınca her şey silinir. Yalnızca kişisel bilgisayarınızda açın.',
  'settings.clear': 'Her şeyi temizle',
  'settings.clearNote': 'Tüm belgeleri kapatır ve bellekten ve tarayıcı depolamasından siler.',
  'settings.privacy': 'Tüm belgeler yalnızca tarayıcınızda işlenir. Sitede analiz aracı yoktur ve üçüncü taraf sunuculara asla bağlanmaz.',

  'tab.untitled': 'Adsız {n}.md',
  'tab.close': 'Kapat',
  'tab.closeNamed': '{name} belgesini kapat',
  'tab.new': 'Yeni belge',
  'dialog.cancel': 'İptal',
  'dialog.close': 'Kapat',
  'close.title': 'Kaydetmeden kapatılsın mı?',
  'close.body': '"{name}" kaydedilmemiş değişiklikler içeriyor. Bu değişiklikler kaybolacak.',
  'clear.title': 'Her şey temizlensin mi?',
  'clear.body': 'Açık belgelerin tümü kapatılacak ve bellekten ve tarayıcı depolamasından silinecek. Kaydedilmemiş değişiklikler kaybolacak.',
  'clear.ok': 'Temizle',
  'clear.done': 'Her şey temizlendi',

  'status.counts': 'Sözcük: {words} · Karakter: {chars} · Satır: {lines} · ~{minutes} dk okuma',
  'status.blocked': 'Koruma tarafından engellenen: {n}',
  'status.dangers': 'Tehlikeli: {n}',
  'status.warnings': 'Şüpheli: {n}',
  'status.missing': 'Eksik dosya: {n}',
  'status.details': 'Ayrıntıları göster',
  'status.private': 'Yalnızca tarayıcınızda',
  'status.privateTitle': 'Belgeler tarayıcınızdan hiç çıkmaz: sitenin onları alabilecek bir sunucusu yoktur ve güvenlik politikası ağ isteklerini yasaklar.',

  'issues.title': 'Harici kaynaklar ve tehdit denetimi',
  'issues.danger': 'Tehlikeli — engellendi',
  'issues.warn': 'Şüpheli',
  'issues.blocked': 'Koruma modu tarafından engellendi',
  'issues.missing': 'Yerel dosya bulunamadı',
  'issues.unsupported': 'Desteklenmiyor',
  'issues.note': 'Bu hafif bir denetimdir: adresleri hiçbir çevrim içi hizmete göndermeden tarayıcıda çalışan sezgisel yöntemler. Bir antivirüs değildir.',

  'link.title': 'Şüpheli bağlantı',
  'link.found': 'Hafif denetim uyarı işaretleri buldu:',
  'link.address': 'Adres:',
  'link.note': 'Bu bir sezgisel yöntemdir, antivirüs değildir. Yalnızca kaynağa güveniyorsanız açın.',
  'link.open': 'Yine de aç',

  'files.opened': 'Açılan belgeler: {n}',
  'files.media': 'medya dosyaları: {n}',
  'files.skipped': 'atlananlar: {n} ({names})',
  'files.readError': 'Dosyalar okunamadı: {error}',
  'files.tooLarge': '"{name}" dosyası çok büyük (20 MB üzeri)',
  'files.notText': '"{name}" dosyası bir metin dosyasına benzemiyor',
  'save.done': 'Kaydedildi: {name} (tarayıcının indirilenler klasörüne)',
  'export.done': 'Dışa aktarıldı: {name}',
  'render.error': 'Görüntüleme hatası: {error}',

  'editor.placeholder': 'Markdown yazmaya başlayın veya dosyaları buraya bırakın…',
  'editor.aria': 'Markdown düzenleyicisi',
  'preview.frameTitle': 'Belge önizlemesi',

  'tb.undo': 'Geri al (Ctrl+Z)',
  'tb.redo': 'Yinele (Ctrl+Y)',
  'tb.heading': 'Başlık',
  'tb.normal': 'Normal metin',
  'tb.headingN': 'Başlık {n}',
  'tb.bold': 'Kalın (Ctrl+B)',
  'tb.italic': 'İtalik (Ctrl+I)',
  'tb.strike': 'Üstü çizili',
  'tb.link': 'Bağlantı (Ctrl+K)',
  'tb.image': 'Görsel',
  'tb.bullets': 'Madde işaretli liste',
  'tb.numbers': 'Numaralı liste',
  'tb.tasks': 'Görev listesi',
  'tb.quote': 'Alıntı',
  'tb.code': 'Satır içi kod',
  'tb.codeBlock': 'Kod bloğu',
  'tb.table': 'Tablo',
  'tb.rule': 'Yatay çizgi',
  'tb.advanced': 'Gelişmiş düzenleyici',
  'tb.headings46': 'Başlık 4–6',
  'tb.highlight': 'Vurgulama ==metin==',
  'tb.sup': 'Üst simge x^2^',
  'tb.sub': 'Alt simge H~2~O',
  'tb.kbd': 'Klavye tuşu <kbd>',
  'tb.footnote': 'Dipnot',
  'tb.details': 'Daraltılabilir bölüm (spoiler)',
  'tb.alert': 'Uyarı kutusu',
  'tb.alertNote': 'Not',
  'tb.alertTip': 'İpucu',
  'tb.alertImportant': 'Önemli',
  'tb.alertWarning': 'Uyarı',
  'tb.alertCaution': 'Dikkat',
  'tb.math': 'Matematik formülü',
  'tb.mermaid': 'Mermaid diyagramı',
  'tb.toc': 'İçindekiler',
  'tb.tocEmpty': 'Belgede içindekiler tablosu için başlık yok',
  'tb.indent': 'Girintiyi artır',
  'tb.outdent': 'Girintiyi azalt',
  'tb.find': 'Bul ve değiştir (Ctrl+F)',
  'tb.lineNumbers': 'Satır numaraları',
  'tb.wrap': 'Sözcük kaydırma',

  'snip.text': 'metin',
  'snip.description': 'açıklama',
  'snip.linkText': 'bağlantı metni',
  'snip.column': 'Sütun {n}',
  'snip.cell': 'hücre',
  'snip.code': 'kod',
  'snip.detailsTitle': 'Başlık',
  'snip.detailsBody': 'Gizli içerik',
  'snip.alertText': 'Mesaj metni',
  'snip.contents': 'İçindekiler',
  'snip.mmdStart': 'Başlangıç',
  'snip.mmdCondition': 'Koşul',
  'snip.mmdYes': 'Evet',
  'snip.mmdNo': 'Hayır',
  'snip.mmdResult': 'Sonuç',
  'snip.mmdOther': 'Diğer yol',

  'md.note': 'Not',
  'md.tip': 'İpucu',
  'md.important': 'Önemli',
  'md.warning': 'Uyarı',
  'md.caution': 'Dikkat',
  'md.frontMatter': 'Üst veri (front matter)',
  'media.image': 'görsel',
  'media.audio': 'ses',
  'media.video': 'video',
  'pv.link': 'bağlantı',
  'pv.embed': 'gömülü sayfa',
  'pv.embedReason': 'Üçüncü taraf sayfaları ve oynatıcıları gömmek desteklenmez',
  'pv.embedTitle': 'Gömülü sayfa desteklenmiyor',
  'pv.badgeDanger': 'Engellendi (hafif denetim):',
  'pv.badgeWarn': 'Şüpheli (hafif denetim):',
  'pv.empty': 'Boş başvuru',
  'pv.dangerSource': 'Tehlikeli kaynak engellendi',
  'pv.blockedImage': 'Harici görsel engellendi — "{hint}" seçeneğini açın',
  'pv.blockedMedia': 'Harici ses veya video engellendi — "{hint}" seçeneğini açın',
  'pv.localMissing': 'Yerel dosya bulunamadı: {path}',
  'pv.localMissingHint': 'Belgeyle birlikte bırakın ya da bütün klasörü bırakın',
  'pv.fileBlocked': '"{name}" dosyası engellendi',
  'pv.noSource': 'Medya kaynağı yok',
  'pv.openDoc': '{path} belgesini aç',
  'pv.localLink': '"{path}" yerel dosyası açık değil — belgeyle birlikte bırakın',
  'pv.linkBlocked': 'Bağlantı engellendi: {url}',
  'pv.linksDisabled': 'Bağlantılar devre dışı (tam koruma): {url}\nBağlantıları izlemek için "{hint}" seçeneğini açın.',
  'pv.diagram': 'Diyagram',
  'pv.diagramError': 'Diyagram hatası: {error}',

  'url.bidi': 'Adres görünmez metin yönü karakterleri içeriyor — dosya adlarını gizlemek için kullanılan bir hile',
  'url.control': 'Adres denetim karakterleri içeriyor — filtreleri atlatmak için kullanılan bir hile',
  'url.data': 'Bu türdeki gömülü veriler (data:) yürütülebilir kod içerebilir',
  'url.invalid': 'Geçersiz adres',
  'url.scheme': 'İzin verilmeyen adres türü "{scheme}:" — kod çalıştırabilir veya yerel dosyaları açabilir',
  'url.credentials': 'Adres bir kullanıcı adı veya parola gizliyor (user@host) — klasik bir kimlik avı hilesi: gerçek site "@" işaretinden sonraki kısımdır',
  'url.localLink': 'Yerel ağ adresi (yönlendirici, NAS, localhost)',
  'url.localMedia': 'Yerel ağdan yükleme yasaktır: belge ağınızdaki cihazları yoklayabilir',
  'url.ip': 'Alan adı yerine IP adresi',
  'url.unknownTld': 'Bilinmeyen üst düzey alan adı ".{tld}"',
  'url.scamTld': '".{tld}" alan adı dolandırıcılık için sık kullanılır',
  'url.mixed': '"{host}" alan adı farklı alfabeleri karıştırıyor — tanınmış bir siteyi taklit ediyor olabilir',
  'url.idn': 'Uluslararası karakterli alan adı "{host}" — benzer bir adresi taklit etmediğinden emin olun',
  'url.shortener': 'Bağlantı kısaltıcı — gerçek hedef gizli',
  'url.subdomains': 'Çok fazla alt alan adı — gerçek adresi gizlemek için kullanılan bir hile',
  'url.port': 'Standart dışı bağlantı noktası {port}',
  'url.http': 'Şifrelenmemiş bağlantı (http://) — içerik yolda değiştirilebilir',
  'url.doubleExt': 'Çift uzantı "{name}" — belge kılığına girmiş yürütülebilir dosya',
  'url.executable': 'Yürütülebilir bir dosyayı veya makro içeren bir belgeyi gösteriyor (.{ext})',
  'url.long': 'Çok uzun adres',
  'url.encoded': 'Yoğun biçimde kodlanmış adres — içeriğini gizliyor olabilir',
  'url.textMismatch': 'Bağlantı metni "{shown}" gösteriyor ama "{host}" adresine gidiyor',

  'filecheck.disguised': '"{name}" dosyası medya dosyası gibi görünüyor ama aslında {what}',
  'filecheck.unknown': '"{name}" dosyasının biçimi içeriğinden anlaşılamadı',
  'filecheck.mismatch': '"{name}" dosyasının uzantısı içeriğiyle eşleşmiyor ({detected})',
  'filecheck.svgActive': '"{name}" SVG dosyası etkin içerik (betik veya gömülü HTML) barındırıyor. Tarayıcının bunları asla çalıştırmadığı sıradan bir görsel olarak gösterilir',
  'what.exe': 'bir Windows yürütülebilir dosyası',
  'what.elf': 'bir Linux yürütülebilir dosyası',
  'what.macho': 'bir macOS yürütülebilir dosyası',
  'what.script': 'bir betik',
  'what.html': 'bir web sayfası',
  'what.zip': 'bir ZIP arşivi (veya Office belgesi)',
  'what.rar': 'bir RAR arşivi',
  'what.7z': 'bir 7z arşivi',
  'what.ole': 'eski biçimli bir Office belgesi (makro içerebilir)',
  'what.pdf': 'bir PDF belgesi',

  'sample.name': 'Hoş geldiniz.md',
  'sample.body': `# Markdown Preview Editor

*Yalnızca tarayıcınızda* çalışan, önizlemeli bir **Markdown** düzenleyicisi.
Belgeler hiçbir yere gönderilmez — ne bu siteye ne de başka birine.

> [!TIP]
> Bir \`.md\` dosyasını, birden çok dosyayı ya da bütün bir klasörü **pencerenin sol yarısına** bırakın; sekmelerde açılırlar.
> Belgeyle birlikte bırakılan görseller otomatik olarak eklenir.

## Özellikler

- [x] Canlı önizleme ve eşzamanlı kaydırma
- [x] Tablolar, görev listeleri, dipnotlar[^1], ==vurgulama==, H~2~O ve x^2^
- [x] Kod renklendirme, formüller ve diyagramlar
- [ ] Verilerinizi bir yere göndermek — **asla**

| Mod | Harici bağlantılar | Harici görseller |
| :--- | :---: | :---: |
| Tam koruma | devre dışı | yüklenmez |
| İzinlerle | denetlenir | denetlenir |

## Kod

\`\`\`typescript
function greet(name: string): string {
  return \`Merhaba, \${name}!\`;
}
\`\`\`

## Formüller

Euler özdeşliği: $e^{i\\pi} + 1 = 0$

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}
$$

## Diyagramlar

\`\`\`mermaid
flowchart LR
    A[.md dosyası] --> B(Tarayıcı)
    B --> C{Harici kaynaklar?}
    C -->|Tam koruma| D[Engellendi]
    C -->|İzin verildi| E[Tehdit denetimi]
\`\`\`

## Koruma iş başında

Bu görsel harici bir sunucuda duruyor, bu yüzden *Tam koruma* modunda yüklenmez:

![Harici görsel](https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg)

Bu bağlantı, "Bağlantılara izin ver" açılana kadar devre dışı kalır: [CommonMark](https://commonmark.org/).

Bu bağlantı ise şüpheli — metni bir adres gösteriyor ama başka bir adrese gidiyor: [https://bank.example.com](https://bank-example.xyz/login).

---

Kısayollar: <kbd>Ctrl</kbd>+<kbd>B</kbd> kalın, <kbd>Ctrl</kbd>+<kbd>I</kbd> italik, <kbd>Ctrl</kbd>+<kbd>K</kbd> bağlantı, <kbd>Ctrl</kbd>+<kbd>S</kbd> kaydet, <kbd>Ctrl</kbd>+<kbd>O</kbd> aç, <kbd>Ctrl</kbd>+<kbd>F</kbd> bul.

[^1]: Dipnot böyle görünür.
`,
};

export default tr;
