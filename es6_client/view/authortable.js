/*
   Table for author.html using jQuery Data table
   See https://datatables.net/

*/
import {
  authReg
} from "../model/authorRegistry.js"

// Column data definition (see also HTML page)
const columns = [{
    data: "id"
  },
  {
    data: "lastName"
  },
  {
    data: "firstName"
  },
  {
    data: "email"
  },
  {
    data: "address"
  }
];

// Create and add table when DOM fully constructed
$(document).ready(function() {
  let authors = authReg.findAll();
  let table = $('#author').DataTable({
    data: authors,
    columns: columns  // Must be here
  });
});
