/* Квиз перед ботом-приёмником: 4 вопроса, затем кнопка в Telegram. Ответы уходят в метку ?start=<метка>_q<формат><техника><опыт>.
   Младше 18 — вежливый отказ без ссылки. Шаблон: podklyuchit-bota.py подставляет адрес бота вместо https://t.me/WorkWebcamOnlineBot?start=sajt_work-webcam-online. */
(function () {
  var U = 'https://t.me/WorkWebcamOnlineBot?start=sajt_work-webcam-online';
  var Q = [
    { t: 'Вам уже есть 18 лет?', o: ['Да, мне есть 18', 'Нет'] },
    { t: 'Где удобнее работать?', o: ['Из дома', 'В студии', 'Пока не знаю'] },
    { t: 'Что есть из техники?', o: ['Компьютер или ноутбук', 'Только телефон', 'Пока ничего'] },
    { t: 'Был опыт в вебкаме?', o: ['Нет, начну с нуля', 'Немного', 'Да, работала'] }
  ];
  var css = '.kz-f{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:16px;font-family:Arial,sans-serif}' +
    '.kz-b{background:#fff;color:#222;border-radius:16px;max-width:420px;width:100%;padding:24px;box-sizing:border-box;position:relative}' +
    '.kz-s{font-size:13px;color:#777;margin:0 0 6px}.kz-t{font-size:22px;line-height:1.3;margin:0 0 16px;font-weight:bold}' +
    '.kz-o{display:block;width:100%;text-align:left;padding:13px 16px;margin:0 0 10px;border:2px solid #e2e2e8;border-radius:12px;background:#fff;color:#222;font-size:16px;cursor:pointer}' +
    '.kz-o:hover,.kz-o:focus{border-color:#7b3fe4;outline:none}' +
    '.kz-g{display:block;text-align:center;padding:15px;border-radius:30px;background:#2aabee;color:#fff;font-weight:bold;font-size:17px;text-decoration:none}' +
    '.kz-x{position:absolute;top:10px;right:14px;border:0;background:none;font-size:26px;color:#999;cursor:pointer}.kz-p{margin:0 0 16px;font-size:16px;line-height:1.5}';
  var otv = [], f = null;
  function zakryt() { if (f) { f.remove(); f = null; } }
  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt) e.textContent = txt; return e; }
  function shag(i) {
    var b = f.querySelector('.kz-b'); b.innerHTML = '';
    var x = el('button', 'kz-x', '×'); x.setAttribute('aria-label', 'Закрыть'); x.onclick = zakryt; b.appendChild(x);
    if (i === 'net') {
      b.appendChild(el('p', 'kz-t', 'Работа только с 18 лет'));
      b.appendChild(el('p', 'kz-p', 'Спасибо за честный ответ. Возвращайтесь, когда исполнится 18.'));
      return;
    }
    if (i >= Q.length) {
      b.appendChild(el('p', 'kz-t', 'Почти готово!'));
      b.appendChild(el('p', 'kz-p', 'Откройте Telegram и напишите одно сообщение о себе: возраст и город. Ответим там же.'));
      var a = el('a', 'kz-g', 'Открыть Telegram');
      a.href = U + '_q' + otv.slice(1).join(''); a.target = '_blank'; a.rel = 'nofollow';
      a.onclick = function () { setTimeout(zakryt, 300); };
      b.appendChild(a); a.focus(); return;
    }
    b.appendChild(el('p', 'kz-s', 'Вопрос ' + (i + 1) + ' из ' + Q.length));
    b.appendChild(el('p', 'kz-t', Q[i].t));
    Q[i].o.forEach(function (o, n) {
      var k = el('button', 'kz-o', o);
      k.onclick = function () { if (i === 0 && n === 1) return shag('net'); otv[i] = n + 1; shag(i + 1); };
      b.appendChild(k);
    });
    b.querySelector('.kz-o').focus();
  }
  function otkryt(e) {
    e.preventDefault(); e.stopImmediatePropagation();
    if (f) return;
    if (!document.getElementById('kz-css')) { var s = el('style'); s.id = 'kz-css'; s.textContent = css; document.head.appendChild(s); }
    otv = []; f = el('div', 'kz-f'); f.setAttribute('role', 'dialog'); f.setAttribute('aria-modal', 'true');
    f.appendChild(el('div', 'kz-b')); f.onclick = function (ev) { if (ev.target === f) zakryt(); };
    document.body.appendChild(f); shag(0);
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') zakryt(); });
  document.addEventListener('submit', function (e) { if (e.target && e.target.tagName === 'FORM') otkryt(e); }, true);
  document.addEventListener('click', function (e) {
    var t = e.target && e.target.closest ? e.target : null; if (!t || t.closest('.kz-f')) return;
    if (t.closest('form .t-submit, form [type=submit]') || t.closest('a[href^="' + U.split('?')[0] + '"]')) otkryt(e);
  }, true);
})();
