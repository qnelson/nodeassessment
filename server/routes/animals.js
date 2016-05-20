var express = require('express');
var router = express.Router();
var pg = require('pg');
var randomNumber = require('./randomNumber');

//should match SQL
var connectionString = 'postgres://localhost:5432/nodeassessment';

router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM animals', function (err, result) {
      done();

      res.send(result.rows);
    });
  });
});

router.post('/', function (req, res) {
  var animal = req.body;

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO animals (animal_type, animal_number) ' +
                  'VALUES ($1, $2)',
                [animal.animal_type, randomNumber(1, 100)],
                 function (err, result) {
                   done();

                   if (err) {
                     res.sendStatus(500);
                     return;
                   }

                   res.sendStatus(201);
                 });
               });
          });

module.exports = router;
