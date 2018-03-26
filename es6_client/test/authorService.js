/*
    Test groud for the authorService.js. Testing AJAX calls
*/

import {
  authService as as
} from "../service/authorService.js"

as.findAll(data => {
  console.log(data);
});

as.find("FF", data => {
  console.log(data);
});

/*
let a = new Authot
as.create()
*/
