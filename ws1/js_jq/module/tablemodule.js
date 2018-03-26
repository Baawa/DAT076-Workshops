/*
     An ES6 module exporting a Table class
     This is ECMA-script 6 (ES6 or ES2015)

     This uses JQuery for DOM maipulation
*/
export class Table {

  constructor(rows, cols, data, striped) {
    this.rows = rows;
    this.cols = cols;
    this.data = data;
    this.striped = striped;
  }

  render() {
    console.log(this.data);
    var tbl = document.createElement('table');
    tbl.setAttribute("id", "Div1");
    var tbdy = document.createElement('tbody');

    var index = 0;

    for (var i = 0; i < this.rows; i++) {
      var row = document.createElement('tr');
      for (var j = 0; j < this.cols; j++){
        var col = document.createElement('td');
        col.innerHTML = this.data[index];
        row.append(col);
        index++;
      }

      if (this.striped && (i%2 == 1)){
        row.style.background = "grey";
      }

      tbdy.append(row);
    }

    tbl.append(tbdy);

    return tbl;
  }

  edit(row, col, value) {
    var i = row * this.cols + col;
    this.data[i] = value;
    console.log(row);
    console.log(col);
    console.log(value);
    console.log(this.cols);
    console.log(this.data);
  }

}
