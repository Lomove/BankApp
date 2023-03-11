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

//Анимация меню при наведении
{
  const menu = document.querySelector('.header-nav');
  const elemntsAnim = document.querySelectorAll('.anim-anchor');

  menu.addEventListener('mouseover', (e) => {
    const linkTarget = e.target.closest('.anim-anchor');

    //GUARD
    if (!linkTarget) return;

    elemntsAnim.forEach((element) => (element.style.opacity = '0.4'));
    linkTarget.style.opacity = '1';
  });
  menu.addEventListener('mouseout', () => {
    elemntsAnim.forEach((element) => (element.style.opacity = '1'));
  });
}

//Прокрутка к первой секции при нажатии на кнопку "Узнать больше"
// {
//   btnToSection1.addEventListener('click', (e) => {
//     e.preventDefault();
//     section1.scrollIntoView({ behavior: 'smooth' });
//   });
// }

//Операции - вкладки.
{
  const btnsOperTabs = document.querySelectorAll('.operation-btn');
  const tabsOper = document.querySelectorAll('.operations-content');
  const parentBtnsOperTabs = document.querySelector('.operations-menu');
  let tabActive = 0;

  parentBtnsOperTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.operation-btn');
    //Guard
    if (!(btn && btn.value != tabActive)) return;

    //Манипуляции
    btnsOperTabs[tabActive].classList.remove('active');
    tabsOper[tabActive].classList.remove('active');

    btnsOperTabs[btn.value].classList.add('active');
    tabsOper[btn.value].classList.add('active');

    tabActive = btn.value;
  });
}
