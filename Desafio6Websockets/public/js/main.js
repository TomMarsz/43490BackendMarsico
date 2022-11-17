const socket = io.connect();

function addMessage(e) {
	const email = document.getElementById("email").value;
	const date = new Date.now();
	const message = document.getElementById("message").value;
	const newMessage = {
		email: email,
		message: message,
	};
	socket.emit("newMessage", newMessage);
	return false;
}

function render(data) {
	const html = data
		.map((elem, index) => {
			return `
			<div>
				<strong>${elem.email}</strong>: 
				<em>${elem.message}</em>
			</div>
		`;
		})
		.join(" ");

	document.getElementById("message").innerHTML = html;
}

socket.on("mesagges", function (data) {
	render(data);
});
