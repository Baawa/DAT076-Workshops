class BookService{

  constructor(){
    this.baseUrl = "http://localhost:8080/ws4/rest/book/";
  }

  findAll(callback){
    window.$.ajax({
      url: this.baseUrl,
      method: "GET",
      context: this
    }).done(data => {
      callback(data);
    }).fail(msg => {
      console.log(msg);
    })
  }

  create(book, callback){
    window.$.ajax({
        url: this.baseUrl,
        data: book,
        method: "POST",
        dataType: "json",
        crossDomain: true,
        context: this,
      }).done(data => {
        callback(data);
      })
      .fail(msg => {
        console.log(msg);
      })
  }

  find(isbn, callback) {
    $.ajax({
        url: this.baseUrl + isbn,
        method: "GET"
      }).done(data => {
        callback(data);
      })
      .fail(msg => {
        console.log(msg);
      })
  }

  delete(isbn, callback){
    window.$.ajax({
        url: this.baseUrl + isbn,
        method: "DELETE",
        dataType: "json",
        crossDomain: true,
        context: this, // MUST have!!!
      }).done(data => {
        callback(data);
      })
      .fail(msg => {
        console.log(msg);
      })
  }

  update(book, callback){
    book.genre = "dummy";
    window.$.ajax({
        url: this.baseUrl + "edit",
        data: book,
        method: "POST",
        dataType: "json",
        crossDomain: true,
        context: this, // MUST have!!!
      }).done(data => {
        callback(data);
      })
      .fail(msg => {
        console.log(msg);
      })
  }
}

export const bookService = new BookService();
