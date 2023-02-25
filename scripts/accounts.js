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
const userAutorization = function (login, pin = false, changeAccount = false) {
  //Поиск логина в базе. Возвращает найденный акк или false.
  const chekLogin = function (login) {
    return accounts.find((account) => account.login === login);
  };

  // Сверка ПИН-кода. Возвращает TRUE/FALSE.
  const chekPIN = function (account, pin) {
    return account.pin === pin;
  };

  //Проверка на формат пин.
  if (pin != false || pin === 0) if (!pin) return 'Ошибка - не корректный формал ПИН-кода';

  // Ищем аккаунт
  const detectedAccount = chekLogin(login);
  if (!detectedAccount) return 'Ошибка - логина не существует';

  // Сверяем ПИН, если при вызове родительской функции он был передан.
  if (pin != false) if (!chekPIN(detectedAccount, pin)) return 'Ошибка - не правильный ПИН-код';

  // Если все впорядке, устанавливаем значение текущего аккаунта и возвращаем true.
  if (changeAccount === true) currentAccount = detectedAccount;
  return detectedAccount;
};

//Прослушка на кнопку авторизации, вход и вывод в консоль ошибок/успеха.
btnLogin.addEventListener('click', (e) => {
  e.preventDefault();
  const status = userAutorization(inputLoginUsername.value, Number(inputLoginPin.value), true);

  typeof status === 'object' ? enterAccount() : console.log(status);

  inputLoginPin.blur();
});

// Обновление UI
const updateUI = function () {
  showTrans();
};

//Вход юзера
const enterAccount = function () {
  console.log('Вход под аккаунтом ', currentAccount.userName);
  inputLoginUsername.value = '';
  inputLoginPin.value = '';
  inputLoginPin.blur();
  inputLoginUsername.blur();
  labelWelcome.textContent = `Пользователь ${currentAccount.userName} `;
  labelWelcome.style.color = 'black';
  containerApp.style.opacity = '1';

  updateUI();
  operations();
};

//Показать транзакции, текущий баланс, получение, вывод и процент.
const showTrans = function () {
  const currentDate = new Date();
  const currencyOptions = {
    style: 'currency',
    currency: currentAccount.currency,
  };

  // Вычисляем текущий баланс и помещаем его в объект аккаунта. Выводим на экран дату первой операции.
  labelDate.textContent = Intl.DateTimeFormat(currentAccount.locale, { year: 'numeric', month: 'numeric', day: 'numeric' }).format(new Date(currentAccount.transactionsDates[0]));
  currentAccount.balance = currentAccount.transactions.reduce((acc, trans) => acc + trans, 0);
  labelBalance.textContent = new Intl.NumberFormat(currentAccount.locale, currencyOptions).format(currentAccount.balance);

  // Форматируем и помещаем на страницу все транзакции аккаунта
  containerTransactions.innerHTML = '';
  currentAccount.transactions.forEach((trans, i) => {
    //Определяем тип операции и запмываем в переменную.
    const transactionType = trans > 0 ? ['deposit', 'депозит'] : ['withdrawal', 'списание'];

    //Считываем дату текущей транзакции и форматируем ее
    const transactionDate = new Date(currentAccount.transactionsDates[i]);
    const transactionDateFormat = (function () {
      if (currentDate - transactionDate <= 86400000) return 'Сегодня';
      if (currentDate - transactionDate <= 172800000) return 'Вчера';
      if (currentDate - transactionDate <= 259200000) return '2 дня назад';
      if (currentDate - transactionDate <= 345600000) return '3 дня назад';
      return Intl.DateTimeFormat(currentAccount.locale, { year: 'numeric', month: 'numeric', day: 'numeric' }).format(transactionDate);
    })();

    // Всавляем отформатированные транзакции на страницу
    containerTransactions.insertAdjacentHTML(
      'afterbegin',
      `
      <div class="transactions__row">
          <div class="transactions__type transactions__type--${transactionType[0]}">${i + 1} ${transactionType[1]}</div>
          <div class="transactions__date">${transactionDateFormat}</div>
          <div class="transactions__value">${new Intl.NumberFormat(currentAccount.locale, currencyOptions).format(trans)}</div>
      </div>
    `
    );
  });

  // Считаем и отображаем общий приход, исход и проценты
  labelSumIn.textContent = new Intl.NumberFormat(currentAccount.locale, currencyOptions).format(
    currentAccount.transactions.reduce((acc, trans) => {
      if (trans > 0) return acc + trans;
      else return acc;
    }, 0)
  );
  labelSumOut.textContent = new Intl.NumberFormat(currentAccount.locale, currencyOptions).format(
    currentAccount.transactions.reduce((acc, trans) => {
      if (trans < 0) return acc + trans;
      else return acc;
    }, 0)
  );
  labelSumInterest.textContent = new Intl.NumberFormat(currentAccount.locale, currencyOptions).format(
    currentAccount.transactions.filter((trans) => trans > 100).reduce((acc, trans) => acc + (trans * currentAccount.interest) / 100, 0)
  );
};

//Модуль активностей в кабинете
const operations = function () {
  // Перевод денег
  const moneyOrder = function (login, amount) {
    const status = userAutorization(login);
    if (typeof status != 'object') {
      inputTransferAmount.blur();
      inputTransferAmount.value = '';
      return 'Ошибка - логина не существует';
    }

    if (currentAccount.balance < amount) {
      inputTransferAmount.value = '';
      return 'Ошибка - не достаточно средств';
    }

    inputTransferAmount.blur();
    inputTransferTo.value = '';
    inputTransferAmount.value = '';

    status.transactions.push(amount);
    status.transactionsDates.push(new Date());

    currentAccount.transactions.push(-amount);
    currentAccount.transactionsDates.push(new Date());

    updateUI();

    return `Перевод ${amount} клиенту ${status.userName}`;
  };
  btnTransfer.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(moneyOrder(inputTransferTo.value, Number(inputTransferAmount.value)));
  });

  // Запрос займа
  const loanRequest = function () {};

  // Закрытие счета
  const closeAccount = function () {};
};

//Тестовая авторизация!
setTimeout(() => {
  currentAccount = accounts[0];
  enterAccount();
}, 300);
