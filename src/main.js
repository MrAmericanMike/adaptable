const KOA = require("koa");
const APP = new KOA();
const STATIC = require("koa-static");
const HTTP = require("http");
const HTTP_SERVER = HTTP.createServer(APP.callback());
const IO = require("socket.io")(HTTP_SERVER);
const PORT = process.env.PORT || 5050;

APP.use(STATIC("./public"));

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

HTTP_SERVER.listen(PORT, () => {
	console.log(`Listening on PORT ${PORT}`);
});

