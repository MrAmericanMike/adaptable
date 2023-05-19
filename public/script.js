const SOCKET = io();
const TEXTAREA = document.querySelector("textarea");

let INTERVAL;

SOCKET.on("connect", () => {
	log("Connected to server");
	if (!INTERVAL) {
		log("Setting interval");
		ping();
		INTERVAL = setInterval(ping, 10000);
	}
});

SOCKET.on("disconnect", () => {
	log("Disconnected");
});

function ping() {
	log("Sending: Ping");
	SOCKET.emit("ping", {}, (response) => {
		log(`Received: ${response}`);
	});
}

function log(message) {
	TEXTAREA.value += `${getTimestamp()}: ${message}\n`;
	TEXTAREA.scrollTop = TEXTAREA.scrollHeight;
}

function getTimestamp() {
	const NOW = new Date();
	return `${NOW.getHours().toString().padStart(2, "0")}:${NOW.getMinutes().toString().padStart(2, "0")}:${NOW.getSeconds()
		.toString()
		.padStart(2, "0")}.${NOW.getMilliseconds().toString().padStart(3, "0")}`;
}
