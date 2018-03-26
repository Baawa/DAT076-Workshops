/*
   Collection of Authors
*/
import {
  Author
} from "./author.js"
import {
  eventBus as eB
} from "../util/eventBus.js"
import {
  authService as as
} from "../service/authorService.js"

class AuthorRegistry {

  constructor() {
    // Test data used when not connected to back end
    this.authors = [
        new Author("OO", "ollesson", "olle", "olle@com", "ollev"),
        new Author("FF", "fiasson", "fia", "fia@com", "fiav"),
        new Author("LL", "lisasson", "lisa", "lisa@com", "lisav")
      ];

  }

  find(id) {
    return as.find(id, data => {
      return eB.notify("", data);
    })
  }

  findAll() {
    // When using AJAX uncomment this
    as.findAll(data => {
      return eB.notify("", data);
    })
    // No backend use this, comment out when using AJAX
    //return this.authors;
  }

  create(author) {
    as.create(author, data => {
      eB.notify("ADD", data);
    })
  }

  update(id, author) {
    as.update(id, author, data => {
      eB.notify("UPDATE", data);
    })
  }

  delete(id) {
    as.delete(id, data => {
      eB.notify("DELETE", data);
    })
  }
}

// Singleton
export const authReg = new AuthorRegistry();
