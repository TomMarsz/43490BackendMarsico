class User {
  constructor (name, lastName, books, pet) {
    this.name = name
    this.lastName = lastName
    this.books = [books]
    this.pet = [...pet]
  }
  getFullName() {
     console.log(`El nombre completo del usuario es ${this.name} ${this.lastName}`)
  }
  addPet(newPet) {
    this.pet.push(newPet)
    console.log(this.pet)
  }
  countPets() {
    return console.log(this.pet.length)
  }
  addBook(name,autor) {
    this.books.push({  name,  autor })
    console.log(this.books)
  }
  getBookNames() {
    let arrBookNames = []
    for(let i = 0; i < this.books.length; i++) {
      arrBookNames.push(this.books[i].name)
    }
    console.log(arrBookNames)
  }
}

const newUser = new User ( "Tomás","Mársico", {name: "1984", autor: "George Orwell"}, ["Chiquita", "Loki"])
newUser.addPet("Coffee")
newUser.getFullName()
newUser.countPets()
newUser.addBook("El señor de los Anillos","J.R.R. Tolkien")
newUser.getBookNames()

