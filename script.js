document.addEventListener('DOMContentLoaded', function() {

  // ===== БУРГЕР =====
  const burger = document.getElementById('burgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (burger && navMenu) {
    burger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = burger.querySelector('i');
      icon.className = navMenu.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
    });

    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = burger.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  // ===== FAQ АККОРДЕОН =====
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('active');
        });
        item.classList.toggle('active');
      });
    }
  });

  // ===== МОДАЛЬНОЕ ОКНО =====
  const modalOverlay = document.getElementById('modalOverlay');
  const formState = document.getElementById('formState');
  const successState = document.getElementById('successState');
  const closeBtn = document.getElementById('modalClose');
  const backBtn = document.getElementById('backButton');
  const bookingForm = document.getElementById('bookingForm');
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const nameError = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');

  function openModal() {
    if (formState && successState) {
      formState.style.display = 'block';
      successState.style.display = 'none';
    }
    if (bookingForm) bookingForm.reset();
    if (nameInput) nameInput.classList.remove('error');
    if (phoneInput) phoneInput.classList.remove('error');
    if (nameError) nameError.classList.remove('visible');
    if (phoneError) phoneError.classList.remove('visible');
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Открытие по кнопкам с классом open-modal
  document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  if (backBtn) backBtn.addEventListener('click', closeModal);

  // ===== ВАЛИДАЦИЯ =====
  function validateName(value) {
    return /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(value.trim());
  }

  function validatePhone(value) {
    const digits = value.replace(/[\s\-()+]/g, '');
    return /^\d+$/.test(digits) && digits.length >= 5;
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const name = nameInput ? nameInput.value : '';
      if (!validateName(name)) {
        if (nameInput) nameInput.classList.add('error');
        if (nameError) nameError.classList.add('visible');
        isValid = false;
      } else {
        if (nameInput) nameInput.classList.remove('error');
        if (nameError) nameError.classList.remove('visible');
      }

      const phone = phoneInput ? phoneInput.value : '';
      if (!validatePhone(phone)) {
        if (phoneInput) phoneInput.classList.add('error');
        if (phoneError) phoneError.classList.add('visible');
        isValid = false;
      } else {
        if (phoneInput) phoneInput.classList.remove('error');
        if (phoneError) phoneError.classList.remove('visible');
      }

      if (isValid) {
        if (formState) formState.style.display = 'none';
        if (successState) successState.style.display = 'block';
      }
    });
  }

}); // конец DOMContentLoaded
