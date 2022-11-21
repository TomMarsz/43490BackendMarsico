const { promises: fs } = require("fs");

class Container {
	constructor(route) {
		this.route = route;
	}

	async getAll() {
		try {
			const content = JSON.parse(await fs.readFile(`./${this.route}`, "utf-8"));
			return content;
		} catch (err) {
			console.log(err);
			return [];
		}
	}

	async save(newProduct) {
		try {
			const content = await this.getAll();
			const lastId = content[content.length - 1];
			if (lastId === undefined) {
				const newProductFromCero = {
					id: 1,
					title: newProduct.title,
					price: newProduct.price,
					thumbnail: newProduct.thumbnail,
				};
				await content.push(newProductFromCero);
			} else {
				const newProductCompleted = {
					id: lastId.id + 1,
					title: newProduct.title,
					price: newProduct.price,
					thumbnail: newProduct.thumbnail,
				};
				await content.push(newProductCompleted);
			}
			await fs.writeFile(`./${this.route}`, JSON.stringify(content, null, 2));
		} catch (err) {
			console.log(err);
		}
	}

	async deleteAll() {
		const emptyArr = [];
		await fs.writeFile(`./${this.route}`, JSON.stringify(emptyArr, null, 2));
	}

	async deleteById(id) {
		try {
			const content = await this.getAll();
			const contentFilter = content.filter((e) => e.id !== id);
			await fs.writeFile(
				`./${this.route}`,
				JSON.stringify(contentFilter, null, 2)
			);
		} catch (err) {
			console.log(err);
		}
	}

	async getById(id) {
		const content = await this.getAll();
		const filteredObject = await content.filter((e) => e.id === id);
		const isEmpty = Object.keys(filteredObject).length === 0;
		if (!isEmpty) {
			const filteredObject = await content.filter((e) => e.id === id);
			return filteredObject;
		} else {
			console.log("id no encontrado");
		}
	}

	async getRandom() {
		try {
			const allProducts = await this.getAll();
			const randomItem = Math.floor(Math.random() * allProducts.length);
			const getRandom = allProducts[randomItem];
			return getRandom;
		} catch (err) {
			console.log(err);
		}
	}

	async modifyProductById(id, product) {
		try {
			const content = await this.getAll();
			const filterById = await content.filter((e) => e.id === id);

			const isEmpty = Object.keys(filterById).length === 0;
			if (!isEmpty) {
				const newModifiedProduct = {
					id: id,
					title: `${product.title}`,
					price: product.price,
					thumbnail: `${product.thumbnail}`,
				};
				content.splice(id - 1, 1, newModifiedProduct);
				await fs.writeFile(`./${this.route}`, JSON.stringify(content, null, 2));
			} else {
				console.log("ID no encontrado");
			}
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = Container;
