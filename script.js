'use strict'

const account1 = {
    owner: "Bipul Acharya",
    movements:[1000, 2000, -100, -50, 500, -200, 3000],
    interestRate: 1.09,
    pin: 1111
};

const account2 = {
    owner: "Sanju Thapa",
    movements: [1000, 500,-200, -50, 2000, 500],
    interestRate: 1.12,
    pin: 2222
};

const account3 = {
    owner: "Kunti Regmi",
    movements: [2000, 500, 1000, -50, -100, 1000], 
    interestRate : 1.09,
    pin: 3333
};

const accounts = [account1, account2, account3,];

const main = document.querySelector('.main');
const detail = document.querySelector('.detail');

const welcomeMsg = document.querySelector('.welcomeMsg');
const balance = document.querySelector('.balance');
const containerStatement = document.querySelector('.statement')

const inputUsername = document.querySelector('.input__username');
const inputPin = document.querySelector('.input__pin');
const inputTransferUsername = document.querySelector('.input__transferUsername');
const inputTransferAmount = document.querySelector('.input__transferAmount');
const inputRequestLoan = document.querySelector('.input__requestLoan');
const inputCloseUsername = document.querySelector('.input__closeUsername');
const inputClosePin = document.querySelector('.input__closePin')

const btnLogin = document.querySelector('.btn__login');
const btnTransfer = document.querySelector('.btn__transfer');
const btnLoan = document.querySelector('.btn__loan');
const btnClose = document.querySelector('.btn__close');

const displayStatements = function(statements, sort = false) {
    containerStatement.innerHTML = '';
    const stats = sort? statements.slice().sort((a, b) => a -b) : statements ;

    stats.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdraw';

        const html = `<div class="statement__row">
            <div class="statement__type statement__type--${type}">${i + 1} ${type}</div>
            <div class="statement__date">3 days ago</div>
            <div class="statement__value">${mov}</div>
        </div>`

        containerStatement.insertAdjacentHTML('afterbegin', html);
    })
};
displayStatements(account1.movements);

const displayBalance = function(acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    balance.textContent = `Rs ${acc.balance}`
};
// displayBalance(account1);

const createUsernames = function(accs) {
   accs.forEach(acc => 
    acc.userName = acc.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('')
   );
};
createUsernames(accounts);

const updateUI = function(acc) {
   displayBalance(acc);

   displayStatements(acc.movements);
};


//Event handlers
let currentAccount;

//Login to Account
btnLogin.addEventListener('click', function (e) {
    e.preventDefault();

    currentAccount = accounts.find(acc => acc.userName === inputUsername.value);

   if(currentAccount?.pin === Number(inputPin.value)){
    welcomeMsg.textContent = `Welcome ${currentAccount.owner.split(' ')[0]}`
    main.style.display = 'none'
    detail.style.display = 'block'
    updateUI(currentAccount)
   }

});

//Transfer Amount to other accounts
btnTransfer.addEventListener('click', function(e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(acc => acc.userName === inputTransferUsername.value);
    inputTransferUsername.value =inputTransferAmount.value = '';

    if(
        amount > 0 &&
        receiverAcc &&
        receiverAcc.userName !== currentAccount.userName &&
        currentAccount.balance >= amount
    ){
        //Transferring amount
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);

        //Update UI
        updateUI(currentAccount);

        
    }
    
});

btnLoan.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputRequestLoan.value);
    if(amount > 0 && currentAccount.movements.some(mov => mov > amount * 0.1)) {
        currentAccount.movements.push(amount);
        updateUI(currentAccount);
    }
    inputRequestLoan.value = '';
})




