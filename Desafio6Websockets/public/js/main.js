const socket = io.connect();

function addMessage(e) {
	const email = document.getElementById("email").value;
	const date = new Date().toString();
	const message = document.getElementById("message").value;
	const newMessage = {
		email: email,
		date: date,
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
				<strong class="text-primary">${elem.email}</strong> - <span class="text-danger">${elem.date}</span>	- <em class="text-success">${elem.message}</em>
			</div>
		`;
		})
		.join(" ");

	document.getElementById("message").innerHTML = html;
}

socket.on("mesagges", function (data) {
	render(data);
});
