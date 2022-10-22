const fs = require("fs");

class Container {
  constructor(route) {
    this.route = route;
  }

  /**
   * It takes an object, adds an id to it, and then saves it to a file.
   * @param {object} object - The object you want to save
   * @returns The id of the object that was saved.
   */
  saveObject(object) {
    try {
      const content = JSON.parse(fs.readFileSync(`./${this.route}`, "utf-8"));
      const id = content.length + 1;
      const newObject = { id, ...object };
      content.push(newObject);
      fs.writeFileSync(`./${this.route}`, JSON.stringify(content, null, 2));
      return id;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * It takes an idNumber as an argument, parses the JSON file, filters the content by the idNumber,
   * and returns the filtered content.
   * @param {number} idNumber - the id of the product you want to get
   */
  getById(idNumber) {
    try {
      const content = JSON.parse(fs.readFileSync(`./${this.route}`, "utf-8"));
      const contentFilter = content.filter((e) => e.id === idNumber);
      console.log(contentFilter);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * It reads the file, parses it, and returns the content.
   * @returns An empty array of objects in case of error
   */
  getAll() {
    try {
      const content = JSON.parse(fs.readFileSync(`./${this.route}`, "utf-8"));
      console.log(content);
    } catch (err) {
      return [];
    }
  }

  /**
   * It takes an id number as an argument, reads the file, filters out the object with the matching id
   * number, and then writes the filtered array back to the file.
   * @param {number} idNumber - The id of the object you want to delete
   */
  deleteById(idNumber) {
    try {
      const content = JSON.parse(fs.readFileSync(`./${this.route}`, "utf-8"));
      const contentFilter = content.filter((e) => e.id !== idNumber);
      fs.writeFileSync(
        `./${this.route}`,
        JSON.stringify(contentFilter, null, 2)
      );
      console.log(contentFilter);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * It deletes all the content in the file.
   */
  deleteAll() {
    try {
      const deleteContent = fs.writeFileSync(
        `./${this.route}`,
        JSON.stringify([{}], null, 2)
      );
      console.log(deleteContent);
    } catch (err) {
      console.log(err);
    }
  }
}

const route = new Container("products.json");
route.getAll();
route.deleteById(1);
route.getById(3);
route.deleteAll();
route.saveObject({
  title: "Peugeot",
  price: 7000,
  thumbnail:
    "https://yt3.ggpht.com/ytc/AMLnZu9VHYpPZl_WboTCenxYZtchOdCvzgy53zvLsOGYig=s88-c-k-c0x00ffffff-no-rj",
});
