/*
    Endpoint for url http://localhost:8080/api/authors
*/
import {
  Router
} from "express";
import {
  Book
} from "../entity/book";

export const bookResource = ({
  config,
  db
}) => {
  let router = new Router();

  // URL: localhost:8080/api/authors
  router.get('/', (req, res, next) => {
    db.getRepository(Book)
      .find()
      .then(result => {
        res.json(result);
      });

  });

  // Must be before GET /:id Matching top down ...!
  // URL: localhost:8080/api/authors/count
  router.get('/count', (req, res, next) => {
    //console.log("GET: count (size)");
    db.getRepository(Book)
      .createQueryBuilder("book")
      .select("COUNT(book.isbn)", "count")
      .getRawOne()
      .then(count => {
        res.json(count);
      });
  })

  // URL: localhost:8080/api/authors/FF
  router.get('/:isbn', (req, res, next) => {
    //console.log(req.body);
    db.getRepository(Book)
      .findOneById(req.params['isbn'])
      .then(found => {
        res.json(found);
      })
  });

  router.post('/', (req, res, next) => {
    //console.log(req.body);
    db.getRepository(Book)
      .save(req.body)
      .then(() => {
        res.status(201).send();
      });
  });


  //update
  router.post('/edit', function (req, res, next) {
    db.getRepository(Book).save(req.body).then(() => {
      res.status(201).send();
    })
  });

  //delete
  router.delete('/:isbn', function (req, res, next) {
    db.getRepository(Book)
      .findOneById(req.params['isbn'])
      .then(found => {
        db.getRepository(Book).delete(found).then(() => {
          res.status(201).send();
        })
      })
  });

  return router;
}
