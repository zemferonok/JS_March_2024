const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);
let mySearchParams = [];
for (const [key, value] of searchParams) {
  mySearchParams.push([key, value]);
}

const userId = mySearchParams[0][1];

let pageTitle = document.getElementsByTagName('title')[0];
pageTitle.innerText = `User ${userId}`;


let userContainer = document.createElement('div');
userContainer.classList.add('user');

let button = document.createElement('button');
button.innerText = 'post of current user';
button.addEventListener("click", (event) => {
  postsContainer.classList.toggle('hide');
});

let postsContainer = document.createElement('div');
postsContainer.classList.add('hide', 'posts');


fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  .then(response => response.json())
  .then(user => drillObjectToList(user, userContainer));

const drillObjectToList = (obj, acc) => {
  let ul = document.createElement('ul')
  for (const key in obj) {
    let li = document.createElement('li');
    if (typeof (obj[key]) === "object") {
      li.innerText = `${key}`;
      drillObjectToList(obj[key], li);
    } else {
      li.innerText = `${key} ${obj[key]}`;
    }
    ul.appendChild(li)
  }
  acc.appendChild(ul);
}

fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
  .then(response => response.json())
  .then(posts => {

    for (const post of posts) {
      let postContainer = document.createElement('div');

      let postTitle = document.createElement('div');
      postTitle.innerText = post.title;

      let postLink = document.createElement('a');
      postLink.innerText = 'Show more';
      postLink.href = `post-details.html?postId=${post.id}`;
      postLink.target = '_blank';

      postContainer.append(postTitle, postLink);
      postsContainer.appendChild(postContainer);
    }
  })

  document.body.append(userContainer, button,postsContainer);