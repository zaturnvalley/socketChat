var express = require('express');
app = express(),
path = require('path'),
server = require('http').createServer(app),
io = require('socket.io').listen(server),
users = [];

// Set View Engine
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

// Connect to Socket
io.sockets.on('connection', function(socket){
  //Set Username
  socket.on('set user', function(data, callback){
    if(users.indexOf(data) != -1){
      callback(false);
    } else {
      callback(true);
      socket.username = data;
      users.push(socket.username);
      updateUsers();
    }
  });
  function updateUsers(){
    io.sockets.emit('users', users);
  }
});

// Index Route
app.get('/', function(req,res){
  res.render('index');
});

server.listen(process.env.PORT || 3000);
console.log('Server Started...');