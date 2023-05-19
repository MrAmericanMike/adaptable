const Express = require("express");
const APP = Express();
const HTTP = require("http");
const SERVER = HTTP.createServer(APP);
const { Server } = require("socket.io");
const IO = new Server(SERVER);
const PORT = process.env.PORT || 5050;

APP.use(Express.static("./public"));

APP.get("/ping", (req, res) => {
	res.send("<h1>Pong</h1>");
});

IO.on("connection", async (socket) => {
	console.log("Client connected");

	socket.on("ping", (_, cb) => {
		console.log("Ping received");
		cb("Pong");
	});
	socket.on("disconnect", (data) => {
		console.log("Client disconnected", data);
	});
});

SERVER.listen(PORT, () => {
	console.log(`Listening on PORT ${PORT}`);
});

