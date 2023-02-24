'use strict';

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseNickname = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

let currentAccount;

// Получаем аккаунты из JSON
// Функция fillAccs без параметров, обновляет из файла все аккаунты.
const accounts = [];
const getAccs = function (callBack, accounts) {
  const request = new XMLHttpRequest();
  request.open('GET', './accounts/accounts.json');
  request.responseType = 'json';
  request.send();
  request.onload = function () {
    callBack(request.response);
    createLogins(accounts);
    console.log('Порказ выгруженных аккаунтов', accounts);
  };
};
const fillAccs = getAccs.bind(
  null,
  (response) => {
    accounts.length = 0;
    accounts.splice(0, 0, ...response);
  },
  accounts
);
fillAccs();

//Создание логинов для юзеров.
const createLogins = function (accounts) {
  accounts.forEach((account) => {
    account.login = account.userName
      .toLowerCase()
      .split(' ')
      .map((word) => word[0])
      .join('');
  });
};

//Модуль авторизации / подтверждения существования пользователя.
const userAutorization = function (login, pin = false) {
  //Поиск логина в базе. Возвращает найденный акк или false.
  const chekLogin = function (login) {
    return accounts.find((account) => account.login === login);
  };

  // Сверка ПИН-кода. Возвращает TRUE/FALSE.
  const chekPIN = function (account, pin) {
    return account.pin === pin;
  };

  //Проверка на формат пин.
  if (!pin) return 'Ошибка - не корректный формал ПИН-кода';

  // Ищем аккаунт
  const detectedAccount = chekLogin(login);
  if (!detectedAccount) return 'Ошибка - логина не существует';

  // Сверяем ПИН, если при вызове родительской функции он был передан.
  if (!(pin != false && chekPIN(detectedAccount, pin))) return 'Ошибка - не правильный ПИН-код';

  // Если все впорядке, устанавливаем значение текущего аккаунта и возвращаем true.
  currentAccount = detectedAccount;
  return true;
};

//Прослушка на кнопку авторизации и вывод в консоль ошибок/успеха.
btnLogin.addEventListener('click', (e) => {
  e.preventDefault();
  const status = userAutorization(inputLoginUsername.value, Number(inputLoginPin.value));
  status === true ? console.log('Вход под аккаунтом ', currentAccount.userName) : console.log(status);
});
