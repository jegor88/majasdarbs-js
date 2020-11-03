window.addEventListener('load', function() {
  document.getElementById('save-btn').addEventListener('click', function() {
    const form = document.getElementById('user-form').elements;

    if(isFormValid(form)) {

      let userList = localStorage.userList;

      if(userList) {
        userList = JSON.parse(userList);
      } else  {
        userList = [];
      }

      const user = {
        username: form.namedItem('username').value,
        email: form.namedItem('email').value
      };

      const userId= form.namedItem('user-id').value;
      if(userId) {
        userList[userId] = JSON.stringify(user);

      }else {
        userList.push(JSON.stringify(user));
      }
      localStorage.userList = JSON.stringify(userList);
      renderTable();

    } else {
    }

  });

  function isFormValid(form) {

    let isFormValid = true;
    const errorMsgBlocks = document.getElementsByClassName('error-msg');

    Object.values(errorMsgBlocks).forEach(function(block){
      block.innerHTML = '';
    })

    const username = form.namedItem('username').value;
    if(username.length <6) {
      const errorMsg = document.getElementsByClassName('error-msg username')[0];
      errorMsg.innerHTML = 'Min 6 characters'
      isFormValid = false;

    }

    const email = form.namedItem('email').value;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!re.test(email)) {
      const errorMsg = document.getElementsByClassName('error-msg email')[0];
      errorMsg.innerHTML = 'Not a valid email'
      isFormValid = false;
    }

    return isFormValid;

  }

  function renderTable() {
    const table = document.getElementById('users-table');
    tBody = table.getElementsByTagName('tbody')[0];
    tBody.innerHTML = '';
    const usersList = localStorage.userList ? JSON.parse(localStorage.userList) : [];

    usersList.forEach(function(user, index) {
      user = JSON.parse(user)
      tBody.innerHTML += 
      `
      <tr>
        <td class='tbl'>` + user.username + `</td>
        <td class='tbl'>` + user.email + `</td>
        <td class='btn-field'>
        <button class='edit-btn' user-id=` + index +`>Edit</button>
        <button class='delete-btn' user-id=` + index +`">Delete</button>
        </td>
     </tr>
      `;
    })

    const editBtns = document.getElementsByClassName('edit-btn');
    
    Object.values(editBtns).forEach(function(btn) {
      btn.addEventListener('click', function(event) {
        const userId = event.target.getAttribute('user-id');

        const userList = JSON.parse(localStorage.userList);
        let user = userList[userId];
        user = JSON.parse(user);

        const form = document.getElementById('user-form').elements;
        form.namedItem('username').value = user.username;
        form.namedItem('email').value = user.email;
        form.namedItem('user-id').value = userId;

      })

    })

    const deleteBtn = document.getElementsByClassName('delete-btn');

    Object.values(deleteBtn).forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          const userId = e.target.getAttribute('user-id');
          const userList = JSON.parse(localStorage.userList);
          userList.splice(userId,1);
          localStorage.userList = JSON.stringify(userList);
        })
    })
  }
  renderTable();
})