'use strict';

const body = document.querySelector('body');
const section1 = document.querySelector('.section-services');

const btnsRegistration = document.querySelectorAll('.btn-registration');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnToSection1 = document.querySelector('.a-to-section1');

// Добавляем прослушку на кнопки - открытие модального окна и закрытие.
{
  const modalWindow = document.querySelector('.modal-window');
  const overlay = document.querySelector('.overlay');
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
}

//Прокрутка к первой секции при нажатии на кнопку "Узнать больше"
{
  const section1Coords = section1.getBoundingClientRect();
  btnToSection1.addEventListener('click', (e) => {
    e.preventDefault();
    section1.scrollIntoView({ behavior: 'smooth' });
  });
}
