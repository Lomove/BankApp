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
  const indicator = document.querySelector('.indicator');

  let currentslide = 0;

  //Точки-индикаторы
  for (let i = 0; i < slides.length; i++) {
    indicator.insertAdjacentHTML('beforeend', `<div class="dot" code="${i}"></div>`);
  }
  indicator.firstChild.classList.add('active');
  const dots = document.querySelectorAll('.dot');
  indicator.addEventListener('click', (e) => {
    switch (Number(e.target.getAttribute('code'))) {
      case 0:
        {
          dots[currentslide].classList.remove('active');
          currentslide = 2;
          slideRight();
        }
        break;
      case 1:
        {
          dots[currentslide].classList.remove('active');
          currentslide = 0;
          slideRight();
        }
        break;
      case 2:
        {
          dots[currentslide].classList.remove('active');
          currentslide = 1;
          slideRight();
        }
        break;
    }
  });

  // Налево
  const slideleft = function () {
    dots[currentslide].classList.remove('active');
    currentslide != 0 ? currentslide-- : (currentslide = 2);
    dots[currentslide].classList.add('active');
    slides[currentslide].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };
  btnSlideLeft.addEventListener('click', slideleft);

  // Направо
  const slideRight = function () {
    dots[currentslide].classList.remove('active');
    currentslide != 2 ? currentslide++ : (currentslide = 0);
    dots[currentslide].classList.add('active');
    slides[currentslide].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };
  btnSlideRight.addEventListener('click', slideRight);

  //Стрелками
  document.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.key === 'ArrowLeft') {
      slideleft();
    }
    if (e.key === 'ArrowRight') {
      slideRight();
    }
  });

  // Автопрокрутка
  let sliderInterval;
  new IntersectionObserver(
    (entries) => {
      entries[0].isIntersecting ? (sliderInterval = setInterval(slideRight, 8000)) : clearInterval(sliderInterval);
    },
    { root: null, threshold: 0.5 }
  ).observe(slidesWrapper);
}
