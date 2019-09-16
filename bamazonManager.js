var customer = require("./bamazonCustomer.js");
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
});

function menu() {
    inquirer.prompt([
        {
            name: "options",
            type: "list",
            choices: ["VIEW PRODUCTS FOR SALE", "VIEW LOW INVENTORY", "ADD TO INVENTORY", "ADD NEW PRODUCT"]
        }
    ]).then(function(ans) {
        if(ans.options === choices[0]) {
            console.log("Hi.");
        } else if(ans.options === choices[1]) {
            console.log("Goodbye.");
        } else if(ans.options === choices[2]) {
            console.log("Oh, hi!");
        } else {
            console.log("Ok, bye.");
        }
    });
}