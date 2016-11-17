var http =require('http'),
    express = require('express'), //引入express模块
    app = express(),
    server = require('http').createServer(app),
    io=require('socket.io').listen(server),
    users=new Array();
app.use('/', express.static(__dirname + '/www')); //指定静态HTML文件的位置
server.listen(8080);
console.log('server started');
io.on('connection',function(socket){
	socket.on('login',function(nickname){
		if(users.indexOf(nickname)>-1){
			socket.emit('existed');
		}else{
           
			socket.userindex=users.length;
			socket.nickname=nickname;
			users[nickname]=socket.id;
			socket.emit('success');
			console.log(users['11']);
			io.sockets.sockets[users['11']].emit('system',nickname,users.length,'login');
		}
	});
	socket.on('disconnect',function(nickname){
		delete users[nickname];
		io.sockets.sockets[users['11']].emit('system',socket.nickname,users.length,'logout');
	});
	socket.on('send',function(nickname,om,op){
		if(op==0){
          io.sockets.sockets[users['11']].emit('mes',nickname,om);
		}else{
		  io.sockets.sockets[users[nickname]].emit('mes','11',om);
		}
	})

})