/*
   Table for book.html using jQuery Data table
   See https://datatables.net/

*/
import {
  bookCat
} from "../model/bookCatalogue.js"

// Column data definition (see also HTML page)
const columns = [{
    data: "isbn"
  },
  {
    data: "price"
  },
  {
    data: "title"
  }
];

// Create and add table when DOM fully constructed
$(document).ready(function() {
  let books = bookCat.findAll();
  let table = $('#book').DataTable({
    data: books,
    columns: columns  // Must be here
  });
});
