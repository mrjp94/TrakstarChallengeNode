const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

//Create connection
const conn = mysql.createConnection({
  host: 'sql3.freemysqlhosting.net',
  user: 'sql3488022',
  password: 'fAsK4k1jer',
  database: 'sql3488022'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

app.route('/api').get((req, res) => {
  let sql = "SELECT * FROM Products";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(200, results)
  });
})

app.route('/api/getproduct/:ProductID').get((req, res) => {
  let sql = "SELECT * FROM Products WHERE ProductID="+req.params.ProductID+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(200, results)
  });
})

app.route('/api/getproductbyname/:Name').get((req, res) => {
  let sql = "SELECT * FROM Products WHERE Name="+"'"+req.params.Name+"'"+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(200, results)
  });
})



app.route('/api/addproduct').post((req, res) => {
  let data = {
    ProductID: req.body.ProductID, 
    Name: req.body.Name, 
    Description: req.body.Description, 
    Price: req.body.Price, 
  };
  let sql = "INSERT INTO Products SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(201, req.body)
  });
})

app.route('/api/updateproduct').put((req, res) => {
  let data = {
    ProductID: req.body.ProductID, 
    Name: req.body.Name, 
    Description: req.body.Description, 
    Price: req.body.Price, 
  };
  let sql = "UPDATE Products SET Name='"+data.Name+"', Description='"+data.Description+"', Price='"+data.Price+"' WHERE ProductID="+data.ProductID;
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(200, req.body)
  });
})

app.route('/api/removeproduct/:ProductID').delete((req, res) => {
  let sql = "DELETE FROM Products WHERE ProductID="+req.params.ProductID+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.sendStatus(204)
  });
})
 
app.listen(8000, () => {
  console.log('Server is running at port 8000');
});