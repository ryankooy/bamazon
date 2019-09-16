var mysql = require("mysql");
var inquirer = require("inquirer");

var conn = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1289",
    database: "bamazon"
});

conn.connect(function(err) {
    if(err) throw err;
    displayProducts();
});

function displayProducts() {
    var sql = "select * from products";
    conn.query(sql, function(err, res) {
        if(err) throw err;
        console.log("ITEM ID | PRODUCT | DEPARTMENT | PRICE | QUANTITY");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        conn.end();
    });
}