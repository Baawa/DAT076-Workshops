/*

    This is the control part connecting the table module and the page

*/
// ES6 module style import
import {
  Table
} from "./tablemodule.js";

// Function run when DOM is finished loading (= document.ready() )
// Here you shoule use the jQuery DOM API and eventhandling to
$(function() {
  // Connecting eventhandlers to elements, jQuery style
  // bind() will set "this" to the control object, if NOT, the clicked
  // button will be "this"
  $("#create").on("click", control.createTable.bind(control));
  $("#edit").on("click", control.editTable.bind(control));
});

// Dummy data
const data = "The Document Object Model (DOM) is a programming interface for" +
  "HTML, XML and SVG documents. It provides a structured representation of the" +
  " document as a tree. The DOM defines methods that allow access to the tree," +
  " so that they can change the document structure, style and content.";

class Control {

  createTable() {
    console.log("create table");
    $("#parent").empty();
    let rows = $("#rows").val();
    let cols = $("#cols").val();
    let striped = $("#striped").is(':checked');
    this.table = new Table(rows, cols, data.split(" "), striped);
    $("#parent").append(this.table.render());
  }

  editTable() {
    if (this.table === null) {
      return;
    }
    let row = parseInt($("#row").val());
    let col = parseInt($("#col").val());
    let val = $("#value").val();

    this.table.edit(row, col, val);
    $("#Div1").remove();
    $("#parent").append(this.table.render());
  }
}
// Must be after class declaration (i.e. not hoisted)
const control = new Control();
