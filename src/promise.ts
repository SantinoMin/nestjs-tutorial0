// promise 개념잡으려고 작성해본거임

const timePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(console.log('connected'));
    reject(new Error('error'));
  }, 5000);
});

timePromise
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log('end!');
  });
