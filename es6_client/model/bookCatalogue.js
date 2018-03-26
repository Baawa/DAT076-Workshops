import {
  Book
} from "./Book.js"
import {
  eventBus as eB
} from "../util/eventBus.js"
import {
  bookService as bs
} from "../service/bookService.js"

class bookCatalogue{

  constructor(){
    this.books = [
      new Book("isb1", "Book 1", 100),
      new Book("isb2", "Book 2", 200),
      new Book("isb3", "Book 3", 300)
    ]
  }

  find(isbn){
    return bs.find(isbn, data => {
      return eB.notify("", data);
    })
  }

  findAll(){
    bs.findAll(data => {
      return eB.notify("", data);
    })
  }

  create(book){
    bs.create(book, data => {
      eB.notify("ADD", data);
    })
  }

  update(book){
    bs.update(book, data => {
      eB.notify("UPDATE", data);
    })
  }

  delete(isbn){
    bs.delete(isbn, data => {
      eB.notify("DELETE", data);
    })
  }
}

export const bookCat = new bookCatalogue();
