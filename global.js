const speak = () => {
  console.log("hello, from samrah");
};

speak();

// Global Object

// console.log(global);

// global.setTimeout(() => {
//   console.log('in the timeout');
// }, 3000);

setTimeout(() => {
  console.log("in the timeout");
  clearInterval(int);
}, 3000);

const int = setInterval(() => {
  console.log("in the interval");
}, 1000);

console.log(__dirname); // to get the current directory
console.log(__filename); // to get the current directory with the current file name

// no access to DOM methods
console.log(document.querySelector); // would return a not defined error
