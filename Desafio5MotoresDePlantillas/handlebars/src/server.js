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

// EXPRESS

const express = require("express");
const app = express();
const { Router } = express;
const router = Router();
const exphbs = require("express-handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "../views");

app.use("/api", router);

const products = [];

router.get("/", (req, res) => {
	res.render("datos");
});
router.get("/products", (req, res) => {
	res.render("productos");
});

router.post("/", (req, res) => {
	products.push(req.body);
	res.redirect("/api/products");
	res.render("productos");
});

const port = 8080;
const server = app.listen(port, () => {
	console.log(`Listening server http://localhost:${port}`);
});
server.on("error", (err) => {
	console.log(`Server error: ${err}`);
});
