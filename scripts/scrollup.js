'use strict';

const scrollBar = document.querySelector('.scrooll-up');
const header = document.querySelector('header');

new IntersectionObserver(
  (entries, observer) => {
    if (entries[0].isIntersecting === false) {
      header.classList.add('active');
      scrollBar.classList.add('active');
    } else {
      header.classList.remove('active');
      scrollBar.classList.remove('active');
    }
  },
  { root: null, threshold: 0.2 }
).observe(document.querySelector('.section-intro'));
