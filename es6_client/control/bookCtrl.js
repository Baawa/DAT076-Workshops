import {
  bookCat
} from "../model/bookCatalogue.js"
import {
  Book
} from "../model/book.js"
import {
  eventBus as eB
} from "../util/eventBus.js"


class Listener{

  onModelEvent(event, data){
    var table = $('#book').DataTable();
    table.rows().remove();
    table.rows.add(data).draw();
  }

  showEditDeleteModal(rowData){
    $("#misbn").val(rowData.isbn);
    $("#mprice").val(rowData.price);
    $("#mtitle").val(rowData.title);
    $("#editDeleteModal").modal('show');
  }

  update() {
    //console.log("update");
    let isbn = $("#misbn").val();
    let price = $("#mprice").val();
    let title = $("#mtitle").val();
    let bo = new Book(isbn, title, price);

    bookCat.update(bo);
    $("#editDeleteModal").modal('hide');
  }

  delete(){
    let isbn = $("#misbn").val();
    bookCat.delete(isbn);
    $("#editDeleteModal").modal('hide');
  }

  create(){
    let isbn = $("#isbn").val();
    let price = $("#price").val();
    let title = $("#title").val();
    let bo = new Book(isbn, title, price);

    bookCat.create(bo);
  }
}
const listener = new Listener();
// To be able to get events from model must register listener
eB.register(listener);

// Run when DOM fully constructed
$(document).ready(function() {
  // NOTE: Table created and initialized in authortable.js
  // For watchify order of js files matter (dependencies!)
  let table = $('#book').dataTable().api();
  table.on("click", "tbody tr", function(e) {
    listener.showEditDeleteModal(table.row(this).data());
  });
  // Set listeners for element in author.html model dialog
  $("#update").on("click", listener.update);
  $("#delete").on("click", listener.delete);
  $("#add").on("click", listener.create);
});
