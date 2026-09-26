// Plain ES5 on purpose: must run even where the main app cannot.
(function () {
  // A tiny standard polyfill lets the app run on slightly older browsers.
  if (!Object.hasOwn) {
    Object.hasOwn = function (o, k) {
      return Object.prototype.hasOwnProperty.call(o, k);
    };
  }
  var ok =
    typeof window.structuredClone === 'function' &&
    typeof Array.prototype.at === 'function' &&
    typeof window.HTMLDialogElement === 'function';
  if (ok) return;

  var messages = {
    en: 'Your browser is outdated and not supported. Please update it — an outdated browser no longer receives security fixes.',
    de: 'Ihr Browser ist veraltet und wird nicht unterstützt. Bitte aktualisieren Sie ihn – ein veralteter Browser erhält keine Sicherheitsupdates mehr.',
    es: 'Tu navegador está desactualizado y no es compatible. Actualízalo: un navegador antiguo ya no recibe parches de seguridad.',
    fr: 'Votre navigateur est obsolète et n’est pas pris en charge. Mettez-le à jour : un navigateur obsolète ne reçoit plus de correctifs de sécurité.',
    it: 'Il tuo browser è obsoleto e non è supportato. Aggiornalo: un browser obsoleto non riceve più correzioni di sicurezza.',
    pt: 'Seu navegador está desatualizado e não é compatível. Atualize-o — um navegador desatualizado não recebe mais correções de segurança.',
    nl: 'Je browser is verouderd en wordt niet ondersteund. Werk hem bij — een verouderde browser krijgt geen beveiligingsupdates meer.',
    sv: 'Din webbläsare är föråldrad och stöds inte. Uppdatera den – en föråldrad webbläsare får inga säkerhetsuppdateringar längre.',
    pl: 'Twoja przeglądarka jest przestarzała i nieobsługiwana. Zaktualizuj ją — przestarzała przeglądarka nie otrzymuje już poprawek bezpieczeństwa.',
    uk: 'Ваш браузер застарів і не підтримується. Оновіть його — застарілий браузер більше не отримує виправлень безпеки.',
    ru: 'Ваш браузер устарел и не поддерживается. Обновите его — устаревший браузер больше не получает исправлений безопасности.',
    tr: 'Tarayıcınız güncel değil ve desteklenmiyor. Lütfen güncelleyin — eski bir tarayıcı artık güvenlik düzeltmeleri almaz.',
    ja: 'お使いのブラウザーは古いため、サポートされていません。更新してください。古いブラウザーにはセキュリティ修正が提供されません。',
    ko: '사용 중인 브라우저가 오래되어 지원되지 않습니다. 업데이트해 주세요. 오래된 브라우저는 더 이상 보안 업데이트를 받지 못합니다.',
    zh: '您的浏览器版本过旧，不受支持。请更新浏览器——旧版浏览器已无法获得安全更新。',
  };
  var hide = {
    en: 'Click to hide', de: 'Zum Ausblenden klicken', es: 'Haz clic para ocultar', fr: 'Cliquez pour masquer',
    it: 'Fai clic per nascondere', pt: 'Clique para ocultar', nl: 'Klik om te verbergen', sv: 'Klicka för att dölja',
    pl: 'Kliknij, aby ukryć', uk: 'Натисніть, щоб приховати', ru: 'Нажмите, чтобы скрыть', tr: 'Gizlemek için tıklayın',
    ja: 'クリックして非表示', ko: '클릭하여 숨기기', zh: '点击隐藏',
  };
  var lang = String(navigator.language || 'en').toLowerCase().split('-')[0];
  if (!messages[lang]) lang = 'en';

  document.addEventListener('DOMContentLoaded', function () {
    var bar = document.createElement('div');
    bar.className = 'outdated';
    bar.setAttribute('role', 'alert');
    bar.title = hide[lang];
    bar.onclick = function () {
      bar.parentNode.removeChild(bar);
    };
    bar.textContent = messages[lang];
    document.body.insertBefore(bar, document.body.firstChild);
  });
})();
