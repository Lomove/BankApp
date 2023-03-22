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

//Вылет секций при первом скролле вниз страницы
{
  document.querySelectorAll('section:not(:first-child)').forEach((section) =>
    new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting) {
          section.classList.remove('transform-to-up');
          observer.unobserve(entries[0].target);
        }
      },
      { root: null, threshold: 0.1 }
    ).observe(section)
  );
}

//Слайдер
{
  const btnSlideLeft = document.querySelector('.slide-left');
  const btnSlideRight = document.querySelector('.slide-right');

  const slidesWrapper = document.querySelector('.section-feedbacks .slider-wrapper .slides');
  const slides = document.querySelectorAll('.section-feedbacks .slider-wrapper .slide');

  let currentslide = 0;

  //Биндим кнопки
  btnSlideLeft.addEventListener('click', () => {
    currentslide != 0 ? currentslide-- : (currentslide = 2);
    slides[currentslide].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
  const slideRight = function () {
    currentslide != 2 ? currentslide++ : (currentslide = 0);
    // slidesWrapper.scrollLeft = slidesWrapper.offsetWidth * (currentslide + 1);
    slides[currentslide].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };
  btnSlideRight.addEventListener('click', slideRight);

  //Автопрокрутка
  const sliderInterval = setInterval(slideRight, 8000);
}
