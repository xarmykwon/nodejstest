var express = require('express');
var router = express.Router();

var mysql  = require('mysql');
// var config = require('../config/RDB.js').local;
var config = require('../config/RDB.js').real;
var pool = mysql.createPool(config);


router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.ss');
    next(); // make sure we go to the next routes and don't stop here
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.json({ message: 'hooray! welcome to our api!' })
});

router.get('/persons/:mem_id', function(req, res){
	 res.json(req.params.mem_id)
});

router.get('/persons', function(req, res){

	pool.getConnection(function (err, connection) {
        // Use the connection
        connection.query('SELECT * FROM member', function (err, rows) {
            if (err) console.error("err : " + err);
            console.log("rows : " + JSON.stringify(rows));
            // res.render('index', {title: 'test', rows: rows});
            // res.json(JSON.stringify(rows))
            res.json(rows);
            connection.release();


            // Don't use the connection here, it has been returned to the pool.
        });
    });
});



module.exports = router;
