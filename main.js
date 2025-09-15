const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('successMsg');
let lastActive = null;

openBtn.addEventListener('click', () => {
  lastActive = document.activeElement;
  dlg.showModal();
  dlg.querySelector('input,select,textarea,button')?.focus();
  successMsg.style.display = 'none';
});

closeBtn.addEventListener('click', () => dlg.close('cancel'));

form?.addEventListener('submit', (e) => {
  // 1) Сброс кастомных сообщений
  [...form.elements].forEach(el => el.setCustomValidity?.(''));
  // 2) Проверка встроенных ограничений
  if (!form.checkValidity()) {
    e.preventDefault();
    const email = form.elements.email;
    if (email?.validity.typeMismatch) {
      email.setCustomValidity('Введите корректный e-mail, например name@example.com');
    }
    form.reportValidity();
    [...form.elements].forEach(el => {
      if (el.willValidate) el.toggleAttribute('aria-invalid', !el.checkValidity());
    });
    return;
  }
  // 3) Успешная «отправка» (без сервера)
  e.preventDefault();
  successMsg.style.display = 'block';
  setTimeout(() => {
    dlg.close('success');
    form.reset();
    successMsg.style.display = 'none';
  }, 1500);
});

dlg.addEventListener('close', () => { lastActive?.focus(); });