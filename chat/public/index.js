/*global $, io*/
(function () {
  'use strict';

  const socketIo = io();
  const loggedIn = sessionStorage.getItem('loggedIn');
  const userSaved= sessionStorage.getItem('user');
  const loginForm = $('#login');
  const messagesElem = $('#messages');
  const errorElem = $('#error');
  let user4;
  
  function chatting(user) {
    socketIo.on('msg', msg => {
      if(msg.name=== user)
        {messagesElem.append(`<div class="my_message"> you: ${msg.msg}</div>`);}
      else 
        messagesElem.append(`<div class="message">${msg.name}: ${msg.msg}</div>`);
        messagesElem.scrollTop(messagesElem.prop('scrollHeight'));
    });

    socketIo.on('info', info => {
      const text = info.join ? `${info.join} has joined` : `${info.leave} has left`;
      messagesElem.append(`<div class="info"> ${text} the chat</div>`);
      messagesElem.scrollTop(messagesElem.prop('scrollHeight'));
    });
  }

  if (loggedIn !== 'true') {
    loginForm.submit(e => {
      e.preventDefault();
      const user = $('#user').val();
      user4= user;
      $('#user').val('');
      socketIo.emit('login', user, result => {
        if (result) 
          {errorElem.text(result);}
        else {
          sessionStorage.setItem('loggedIn', 'true');
          sessionStorage.setItem('user', user);
          loginForm.slideUp('slow');
          $('#messageContainer').slideDown('slow');
          chatting(user);
        }
      });
    });
  }
  else {
    loginForm.hide();
    const user = sessionStorage.getItem('user');
    $('#messageContainer').slideDown('slow');
    console.log(user);
    chatting(user);
  }

  const messageInput = $('#msg');
  $('#message').submit(e => {
    e.preventDefault();
    socketIo.emit('msg', messageInput.val(), userSaved || user4.toString());
    messageInput.val('');
  });
  
  $('#logOut').on('click', ()=>{
    sessionStorage.setItem('loggedIn', 'false'); 
    socketIo.emit('logOut', user4 || userSaved);
    sessionStorage.removeItem('user');
    $('#messageContainer').slideUp('slow');  
    loginForm.slideDown('slow');
    });
})();
