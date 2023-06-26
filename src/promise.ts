// <<<<<<< HEAD
// // 비동기를 표현한 기존의 콜백함수
// // const addFive = (number, callback) => {
// //   setTimeout(() => {
// //     callback(number + 5), 1000;
// //   });
// // };

// // console.log(addFive(5, 5));

// //////////////////////////////////////

// // console.log('1');
// // setTimeout(() => {
// //   console.log('2');
// // }, 1000);

// // console.log('3');

// // // Synchronous callback
// // const printImmediately = (print) => {
// //   console.log(print());
// // };
// // printImmediately(() => console.log('hello'));

// // // Asynchronous callback

// // const printHello = () => {
// //   console.log('Hello');
// // };
// // printHello();

// // const log = (message) => console.log(message);
// // log('Hello@');
// // log(1234);

// /////////////////////////////////////

// // function ChangeUserName(User) {
// //   User.name = 'santino';
// // }

// // const sangmin = { name: 'sangmin' };
// // ChangeUserName(sangmin);
// // console.log(sangmin);

// ///////////////////////////////////////

// // 3. Default parameters (added in ES6)

// function showMessage(message, from = 'unknown') {
//   console.log(`${message} by ${from}`);
// }

// showMessage('Hi');

// // 4. Rest parameters (addded in ES6)

// function printAll(...args) {
//   for (let i = 0; i < args.length; i++) {
//     console.log(args[i]);
//   }
// }
// =======
// // promise 개념잡으려고 작성해본거임

// const timePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(console.log('connected'));
//     reject(new Error('error'));
//   }, 5000);
// });

// timePromise
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     console.log('end!');
//   });
// >>>>>>> e8681bafda6aeb8917680e7749ba5afee8bdc0b4
//일단 창수가 해결하라고 한 문제들 우선 해결 후 이어서 공부하기
