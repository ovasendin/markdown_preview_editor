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
  document.addEventListener('DOMContentLoaded', function () {
    var bar = document.createElement('div');
    bar.className = 'outdated';
    bar.setAttribute('role', 'alert');
    bar.title = 'Click to hide';
    bar.onclick = function () {
      bar.parentNode.removeChild(bar);
    };
    bar.textContent =
      'Your browser is outdated and not supported. Please update it (Chrome, Edge, Firefox or Safari from 2022 or newer) — ' +
      'an outdated browser is also a risk in itself because it no longer receives security fixes.';
    document.body.insertBefore(bar, document.body.firstChild);
  });
})();
