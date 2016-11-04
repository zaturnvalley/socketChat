$(document).ready(function(){
  var messages = [];
  var socket = io.connect('http://localhhost:3000');
  var chatForm = $('#chatForm');
  var message = $('#chatInput');
  var chatWindow = $('$chatWindow');
  var userForm = $('#userForm');
  var username = $('#username');
  var users = $('#users');
  var error = $('#error');

  // Submit User Form
  userForm.submit(function(e){
    e.preventDefault();
    socket.emit('set user', username.val(), function(data){
      if(data){
        $('#userFormWrap').hide();
        $('#mainWrap').show();
      } else {
        
      }
    });
  });

});