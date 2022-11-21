const { Router } = require("express");
const router = Router();
const Container = require("../index.js");
const path = new Container("./products.json");
const multer = require("multer");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/uploads");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

router.use(
	multer({
		storage,
	}).single("thumbnail")
);

router.get("/", async (req, res) => {
	const products = await path.getAll();
	res.render("index.ejs", {
		products,
	});
});

router.post("/", (req, res) => {
	const body = req.body;
	const photo = req.file;
	body.thumbnail = `/uploads/${photo.filename}`;
	path.save(body);
	res.redirect("/api/products");
});

module.exports = router;
