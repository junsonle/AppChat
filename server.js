var express = require("express");
var app = express();

app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
server.listen(process.env.PORT || 3000 || 9696);

io.on('connect', function (socket) {
	console.log(socket.id+" Da ket noi!");
	
	socket.on('disconnect', function () {
		console.log(socket.id+" Da ngat ket noi!");
	});
	
	socket.on('Chat', function(data){
		console.log(socket.id+": "+data);
		
		socket.broadcast.emit("sChat",data);
	});
});

app.get("/", function (req, res) {
	res.render("index");
});