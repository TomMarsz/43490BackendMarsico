const socket = io.connect();

function addProduct(e) {
	const productTitle = document.getElementById("title").value;
	const productPrice = document.getElementById("price").value;
	const productThumbnail = document.getElementById("thumbnail").value;
	const newProduct = {
		title: productTitle,
		price: productPrice,
		thumbnail: productThumbnail,
	};
	socket.emit("newProduct", newProduct);
	return false;
}

function render(data) {
	const html = data
		.map((elem, index) => {
			return `
			<div>
				<strong>${elem.nombre}</strong>: 
				<em>${elem.mensaje}</em>
			</div>
		`;
		})
		.join(" ");

	document.getElementById("mensajes").innerHTML = html;
}

socket.on("mensajes", function (data) {
	console.log(data);
	render(data);
});
