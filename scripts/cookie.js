'use strict';

const cookieParent = document.querySelector('.section-intro');
const cookieElement = document.createElement('div');

cookieElement.classList.add('cookie');

cookieElement.innerHTML = `
  <div class='wrapper'>
    <p>Мы используем cookie!</p>
    <button class="btn btn-close-cookie">Ок!</button>
  </div>
`;

cookieParent.after(cookieElement);

document.querySelector('.btn-close-cookie').addEventListener('click', () => {
  cookieElement.remove();
});
