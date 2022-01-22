
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "20001206",
  database: "chat"
});

connection.connect();
 

connection.query("SELECT 1 + 1 AS solution", function(error, results, fields) {
  if (error) {console.log("出错啦！！！!");throw error;}
  console.log("The solution is: ", results[0].solution);
});
const selectUserByName = ()=>{connection.query('SELECT * FROM `user` WHERE `name` = "ww"', function(
    error,
    results,
    fields
  ) {
    // error will be an Error if one occurred during the query
    // results will contain the results of the query
    // fields will contain information about the returned results fields (if any)
     response.json(results)
  });}
//connection.end();

app.get('/user',(req,res)=>{
  var result=connection.query('SELECT * FROM `user` WHERE `name` = "ww"')
    res.status(201).send("Hello World!"+result.json);
})

app.listen(9000,()=>{
 console.log("3000");
})
