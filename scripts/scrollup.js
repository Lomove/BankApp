'use strict';

const scrollBar = document.querySelector('.scrooll-up');
const startScroll = document.documentElement.clientHeight * 0.8;

window.addEventListener('scroll', () => {
  scrollY > startScroll ? (scrollBar.style.visibility = 'visible') : (scrollBar.style.visibility = 'hidden');
});
