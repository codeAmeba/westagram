(function () {
  
  const inputEmail = document.querySelector('.input-email');
  const inputPassword = document.querySelector('.input-password');
  const loginBtn = document.querySelector('.login-btn');

  inputEmail.addEventListener('keyup', () => {
    checkInput();
  });
  
  inputPassword.addEventListener('keyup', () => {
    checkInput();
  });

  const checkInput = () => {
    if (inputEmail.value.length >= 1 && inputPassword.value.length >= 1) {
      loginBtn.disabled = false;
      loginBtn.style.opacity = 1;
      loginBtn.style.cursor = 'pointer';
    } else {
      loginBtn.disabled = true;
      loginBtn.style.opacity = 0.3;
    }
  };

  document.querySelector('.find-password').addEventListener('click', () => {
    alert('잘 기억해보세요^^');
  });
  
  const updateCopyrightYear = () => {
    const copyrightYear = document.querySelector('.copyright-year');
    const currentYear = new Date().getFullYear();
    copyrightYear.innerHTML = currentYear;
  };
  updateCopyrightYear();

})();
