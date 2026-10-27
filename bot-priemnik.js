(function(){var U='https://t.me/WorkWebcamOnlineBot?start=sajt_work-webcam-online';
function go(e){e.preventDefault();e.stopImmediatePropagation();window.location.href=U;}
document.addEventListener('submit',function(e){if(e.target&&e.target.tagName==='FORM')go(e);},true);
document.addEventListener('click',function(e){var b=e.target&&e.target.closest&&e.target.closest('form .t-submit, form [type=submit]');if(b)go(e);},true);
})();
