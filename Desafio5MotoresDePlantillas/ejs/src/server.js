// FILE STYSTEM

const fs = require("fs");

class Container {
	constructor(route) {
		this.route = route;
	}

	saveObject(object) {
		try {
			const content = JSON.parse(fs.readFileSync(`./${this.route}`, "utf-8"));
			const id = content.length + 1;
			const newObject = { id, ...object };
			content.push(newObject);
			fs.writeFileSync(`./${this.route}`, JSON.stringify(content, null, 2));
			return newObject;
		} catch (err) {
			return err;
		}
	}

	deleteById(idNumber) {
		try {
			const content = JSON.parse(fs.readFileSync(`./${this.route}`, "utf-8"));
			const contentFilter = content.filter((e) => e.id !== idNumber);
			fs.writeFileSync(
				`./${this.route}`,
				JSON.stringify(contentFilter, null, 2)
			);
			return contentFilter;
		} catch (err) {
			return err;
		}
	}

	getById(idNumber) {
		try {
			const content = JSON.parse(fs.readFileSync(`./${this.route}`, "utf-8"));
			const contentFilter = content.filter((e) => e.id === idNumber);
			return contentFilter;
		} catch (err) {
			return err;
		}
	}

	getAll() {
		try {
			const content = JSON.parse(fs.readFileSync(`./${this.route}`, "utf-8"));
			return content;
		} catch (err) {
			return err;
		}
	}
}

const route = new Container("products.json");

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "../views");
app.set("view engine", "ejs");

const products = [];

app.get("/", (req, res) => {
	res.render("inicio", { products: products });
});

app.post("/products", (req, res) => {
	products.push(req.body);
	console.log(products);
	res.redirect("/");
});

const port = 8080;
const server = app.listen(port, () => {
	console.log(`Server listening http://localhost:${port}`);
});
server.on("error", (err) => console.log(`Server Error: ${err}`));
