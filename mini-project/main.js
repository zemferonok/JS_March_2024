let title = document.getElementsByTagName('title')[0];
title.innerText = `Users`;

let usersContainer = document.createElement('div');
usersContainer.classList.add('users');


fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => {
    for (const user of users) {
      let userContainer = document.createElement('div');

      let userInfo = document.createElement('div');
      userInfo.innerText = `Id:${user.id} Name:${user.name}`;

      let userLink = document.createElement('a');
      userLink.innerText = 'Show more';
      userLink.href = `user-details.html?userId=${user.id}`;
      userLink.target = '_blank';

      userContainer.append(userInfo, userLink);
      usersContainer.appendChild(userContainer);
    }
  });

  document.body.append(usersContainer);