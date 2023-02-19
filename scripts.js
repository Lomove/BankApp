'use strict';

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnsRegistration = document.querySelectorAll('.btn-registration');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const body = document.querySelector('body');

// Добавляем прослушку на кнопки - открытие модального окна и закрытие.
btnsRegistration.forEach((btn) =>
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    modalWindow.classList.add('visibility-active');
    overlay.classList.add('visibility-active');
    body.style.overflow = 'hidden';
  })
);
btnCloseModalWindow.addEventListener('click', () => {
  modalWindow.classList.remove('visibility-active');
  overlay.classList.remove('visibility-active');
  body.style.overflow = 'auto';
});
overlay.addEventListener('click', () => {
  modalWindow.classList.remove('visibility-active');
  overlay.classList.remove('visibility-active');
  body.style.overflow = 'auto';
});
