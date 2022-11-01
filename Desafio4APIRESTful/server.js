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
const { Router } = express;
const app = express();
const router = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES

router.get("/productos", (req, res) => {
	try {
		res.send(route.getAll());
	} catch (error) {
		return error;
	}
});

router.get("/productos/:id", (req, res) => {
	const id = parseInt(req.params.id);
	try {
		res.send(route.getById(id));
	} catch (error) {
		return error;
	}
});

router.post("/productos", (req, res) => {
	const product = req.body;
	try {
		res.send(route.saveObject(product));
	} catch (error) {
		return error;
	}
});

router.put("/productos/:id", (req, res) => {
	const product = req.body;
	const id = parseInt(req.params.id);
	try {
		route.deleteById(id);
		const newProduct = { id, ...product };
		res.send(route.saveObject(newProduct));
	} catch (error) {
		return error;
	}
});

router.delete("/productos/:id", (req, res) => {
	const id = parseInt(req.params.id);
	try {
		res.send(route.deleteById(id));
	} catch (error) {
		return error;
	}
});

app.use("/api", router);

// SERVER

const port = 8080;
const server = app.listen(port, () => {
	console.log(`Server runing at http://localhost:${port}`);
});
server.on("error", (err) => console.log(`Server Error: ${err}`));
