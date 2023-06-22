// 비동기를 표현한 기존의 콜백함수
// const addFive = (number, callback) => {
//   setTimeout(() => {
//     callback(number + 5), 1000;
//   });
// };

// console.log(addFive(5, 5));

//////////////////////////////////////

// console.log('1');
// setTimeout(() => {
//   console.log('2');
// }, 1000);

// console.log('3');

// // Synchronous callback
// const printImmediately = (print) => {
//   console.log(print());
// };
// printImmediately(() => console.log('hello'));

// // Asynchronous callback

// const printHello = () => {
//   console.log('Hello');
// };
// printHello();

// const log = (message) => console.log(message);
// log('Hello@');
// log(1234);

/////////////////////////////////////

// function ChangeUserName(User) {
//   User.name = 'santino';
// }

// const sangmin = { name: 'sangmin' };
// ChangeUserName(sangmin);
// console.log(sangmin);

///////////////////////////////////////

// 3. Default parameters (added in ES6)

function showMessage(message, from = 'unknown') {
  console.log(`${message} by ${from}`);
}

showMessage('Hi');

// 4. Rest parameters (addded in ES6)

function printAll(...args) {
  for (let i = 0; i < args.length; i++) {
    console.log(args[i]);
  }
}
