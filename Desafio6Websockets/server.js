const express = require("express");
const router = require("./routes/productRoutes");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/api/products", router);

app.get("/", (req, res) => {
	res.redirect("/api/products");
});

router.get("/api/products", async (req, res) => {
	try {
		const allProducts = await path.getAll();
		res.json(allProducts);
	} catch (error) {
		console.log(error);
	}
});

router.get("/api/products/:id", async (req, res) => {
	try {
		const newId = Number(req.params.id);
		const productById = await path.getById(newId);
		const productNotFound = { error: "Producto no encontrado" };
		if (productById !== undefined) {
			res.json(productById);
		} else {
			res.json(productNotFound);
		}
	} catch (error) {
		console.log(error);
	}
});

router.post("/api/products", async (req, res) => {
	try {
		const product = { title: req.body.title, price: Number(req.body.price) };
		const newProduct = await path.save(product);
		const allProducts = await path.getAll();
		res.json(allProducts);
	} catch (error) {
		console.log(error);
	}
});

router.delete("/api/products/:id", async (req, res) => {
	try {
		const id = Number(req.params.id);
		const elementDeleted = await path.deleteByid(id);
		res.json(elementDeleted);
	} catch (error) {
		console.log(error);
	}
});

router.put("/api/products/:id", async (req, res) => {
	try {
		const id = Number(req.params.id);
		const modifyProduct = await path.modifyProductById(id, req.body);
		res.json(modifyProduct);
	} catch (error) {
		console.log(error);
	}
});

const port = 8080;
const server = app.listen(port, () => {
	console.log(`Server listening http://localhost:${port}`);
});
server.on("error", (err) => console.log(`Server Error: ${err}`));
