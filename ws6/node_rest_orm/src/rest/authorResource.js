/*
    Endpoint for url http://localhost:8080/api/authors
*/
import {
  Router
} from "express";
import {
  Author
} from "../entity/author";

export const authorResource = ({
  config,
  db
}) => {
  let router = new Router();

  // URL: localhost:8080/api/authors
  router.get('/', (req, res, next) => {
    db.getRepository(Author)
      .find()
      .then(result => {
        res.json(result);
      });

  });

  // Must be before GET /:id Matching top down ...!
  // URL: localhost:8080/api/authors/count
  router.get('/count', (req, res, next) => {
    //console.log("GET: count (size)");
    db.getRepository(Author)
      .createQueryBuilder("author")
      .select("COUNT(author.id)", "count")
      .getRawOne()
      .then(count => {
        res.json(count);
      });
  })

  // URL: localhost:8080/api/authors/FF
  router.get('/:id', (req, res, next) => {
    //console.log(req.body);
    db.getRepository(Author)
      .findOneById(req.params['id'])
      .then(found => {
        res.json(found);
      })
  });

  router.post('/', (req, res, next) => {
    //console.log(req.body);
    db.getRepository(Author)
      .save(req.body)
      .then(() => {
        res.status(201).send();
      });
  });


  //update
  router.put('/', function (req, res, next) {
    db.getRepository(Author).save(req.body).then(() => {
      res.status(201).send();
    })
  });

  //delete
  router.delete('/:id', function (req, res, next) {
    db.getRepository(Author)
      .findOneById(req.params['id'])
      .then(found => {
        db.getRepository(Author).delete(found).then(() => {
          res.status(201).send();
        })
      })
  });

  return router;
}
