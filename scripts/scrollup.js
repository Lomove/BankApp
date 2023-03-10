'use strict';

const scrollBar = document.querySelector('.scrooll-up');
const header = document.querySelector('header');
const startScroll = document.querySelector('hr').getBoundingClientRect().y * 0.8;

window.addEventListener('scroll', () => {
  if (scrollY > startScroll) {
    scrollBar.classList.add('active');
    header.classList.add('active');
  } else {
    scrollBar.classList.remove('active');
    header.classList.remove('active');
  }
});
