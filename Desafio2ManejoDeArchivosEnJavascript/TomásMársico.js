const fs = require("fs")

class Container {
  constructor (route){
    this.route = route
  }

  saveObject(object) {
    try {
      const content = JSON.parse(fs.readFileSync(`./${this.route}`, 'utf-8'))
      content.push(object)
      fs.writeFileSync(`./${this.route}`, JSON.stringify(content, null, 2))
      console.log(content)
    } catch (err) {
      console.log(err)
    }
  }

  getById(idNumber) {
    try {
      const content = JSON.parse(fs.readFileSync(`./${this.route}`, 'utf-8'))
      const contentFilter = content.filter(e => e.id === idNumber)
      fs.writeFileSync(`productID:${idNumber}.txt`, JSON.stringify(contentFilter, null, 2))
      console.log(contentFilter)
    } catch (err) {
      console.log(err)    
    }
  }

  getAll() {
    try {
      const content = JSON.parse(fs.readFileSync(`./${this.route}`, 'utf-8'))
      console.log(content)
    } catch (err) {
      return []
    }
  }

  deleteById(idNumber) {
    try {
      const content = JSON.parse(fs.readFileSync(`./${this.route}`, 'utf-8'))
      const contentFilter = content.filter(e => e.id !== idNumber)
      fs.writeFileSync(`./${this.route}`, JSON.stringify(contentFilter, null, 2))
      console.log(contentFilter)
    } catch (err) {
      console.log(err)    
    }
  }

  deleteAll() {
    try {
      const deleteContent = fs.writeFileSync(`./${this.route}`, JSON.stringify([{}], null, 2))
      console.log(deleteContent)
    } catch (err) {
      console.log(err)
    }
  }
}

const route = new Container('products.json')
// route.getAll()
// route.deleteById(1)
// route.getById(3)
// route.deleteAll()
// route.saveObject({
//   "id": 11,
//   "title": "Peugeot",
//   "price": 7000,
//   "thumbnail": "https://yt3.ggpht.com/ytc/AMLnZu9VHYpPZl_WboTCenxYZtchOdCvzgy53zvLsOGYig=s88-c-k-c0x00ffffff-no-rj"}
// )