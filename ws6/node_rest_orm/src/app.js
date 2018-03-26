import {
  createConnection
} from "typeorm";
import express from "express";
import {
  Author
} from "./entity/author";
import cors from "cors";
import bodyParser from "body-parser";
import {
  authorResource
} from "./rest/authorResource";
import {
  bookResource
} from "./rest/bookResource";

const config = {
  "port": 8080,
  "bodyLimit": "100kb",
  "corsHeaders": ["Link"]
}

const app = express();

// 3rd party middleware
app.use(cors({
  exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
  limit: config.bodyLimit
}));

// Try connect to db
createConnection().then(db => {

  // During development, check if database ok
  /*db.getRepository(Author)
    .find()
    .then(result => {
      console.log(result);
    });
  */

  // Map url to resource and send params.
  app.use('/authors', authorResource({
    config,
    db
  }));

  app.use('/books', bookResource({
    config,
    db
  }));

  app.listen(8080, () => {
    console.log("Started on 127.0.0.1:8080");
  });
}).catch(error => console.log("Error: ", error));
