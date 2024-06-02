const queryString = window.location.search;
const searchParams = new URLSearchParams(queryString);
let mySearchParams = [];
for (const [key, value] of searchParams) {
  mySearchParams.push([key, value]);
}

const postId = mySearchParams[0][1];

let pageTitle = document.getElementsByTagName('title')[0];
pageTitle.innerText = `Post ${postId}`;


let postContainer = document.createElement('div');
postContainer.classList.add('post');

let button = document.createElement('button');
button.innerText = 'komments of current post';
button.addEventListener("click", (event) => {
  commentsContainer.classList.toggle('hide');
});

let commentsContainer = document.createElement('div');
commentsContainer.classList.add('comments', 'hide');


fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
  .then(response => response.json())
  .then(post => drillObjectToList(post, postContainer));

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

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
  .then(response => response.json())
  .then(comments => {

    for (const comment of comments) {
      let commentContainer = document.createElement('div');
      drillObjectToList(comment, commentContainer);
      commentsContainer.appendChild(commentContainer);
    }
  })

document.body.append(postContainer, button, commentsContainer);