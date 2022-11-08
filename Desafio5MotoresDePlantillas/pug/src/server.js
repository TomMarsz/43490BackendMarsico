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
const bodyParser = require("body-parser");
const { Router } = express;
const router = Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/api", router);

const products = [];

router.get("/datos", (req, res) => {
	res.render("nivel", req.query);
});

router.get("/productos", (req, res) => {
	res.render("productos", req.query);
});

const port = 8080;
const server = app.listen(port, () => {
	console.log(`Listening server http://localhost:${port}`);
});
server.on("error", (err) => {
	console.log(`Server error: ${err}`);
});
