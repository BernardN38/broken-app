### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  promises
  async/await
  callbacks

- What is a Promise?
  a promise is a function that will be resolved at a later time either rejected or fuffiled

- What are the differences between an async function and a regular function?
  async is outside of the event loop

- What is the difference between Node.js and Express.js?
  node is a runtime enviroment that executes javascript outside of the browser
  express is a server framework built on top of node 

- What is the error-first callback pattern?
  returns and error object and any data from a function

- What is middleware?
  code that runs between the request and response 

- What does the `next` function do?
  executes next middleware

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

requests are being sent one at a time, would be better to send them in parallel 

could be written
async function getUsers(users=[]) {
  const BASE_URL= 'https://api.github.com/users/'
  let promises = [];
  let result = [];

  for (let user of users){
    promises.push($.getJSON(`${BASE_URL}${user}`))
  }

  const data = await Promise.all(promises);
  data.forEach(({ data }) => {
    result = [...result, data];
  });
  return result
}