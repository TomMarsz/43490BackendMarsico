// FILE STYSTEM

const fs = require("fs");

class Container {
	constructor(route) {
		this.route = route;
	}

	getRandom(idNumber) {
		try {
			const content = JSON.parse(fs.readFileSync(`./${this.route}`, "utf-8"));
			const contentFilter = JSON.stringify(
				content.filter((e) => e.id === idNumber)
			);
			return contentFilter;
		} catch (err) {
			return err;
		}
	}

	getAll() {
		try {
			const content = JSON.stringify(
				JSON.parse(fs.readFileSync(`./${this.route}`, "utf-8"))
			);
			return content;
		} catch (err) {
			return err;
		}
	}
}

const route = new Container("products.json");

// EXPRESS

const express = require("express");
const app = express();
const port = 8080;

// ROUTES

app.get("/", (req, res) => {
	res.send(
		`Use the params "products" to see all products or "randomProducts" to see a random product`
	);
});

app.get("/products", (req, res) => {
	res.send(`<h1>Los productos disponibles son:</h1>\n${route.getAll()}`);
});

app.get("/randomProducts", (req, res) => {
	const content = JSON.parse(route.getAll());
	const randomId = Math.floor(Math.random() * content.length) + 1;
	res.send(
		`<h1>El producto random elegido es:</h1> ${route.getRandom(randomId)}`
	);
});

// SERVER

const server = app.listen(port, () => {
	console.log(`Server runing at http://localhost:${port}`);
});
server.on("error", (err) => console.log(`Server Error: ${err}`));
