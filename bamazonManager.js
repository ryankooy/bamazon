// var customer = require("./bamazonCustomer.js");
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
    menu();
});

function menu() {
    inquirer.prompt([
        {
            name: "options",
            type: "list",
            choices: ["VIEW PRODUCTS FOR SALE", "VIEW LOW INVENTORY", "ADD TO INVENTORY", "ADD NEW PRODUCT"]
        }
    ]).then(function(ans) {
        if(ans.options === "VIEW PRODUCTS FOR SALE") {
            forSale();
        } else if(ans.options === "VIEW LOW INVENTORY") {
            lowInv();
        } else if(ans.options === "ADD TO INVENTORY") {
            addInv();
        } else {
            newProd();
        }
    });
}

function forSale() {
    var sql = "select * from products";
    conn.query(sql, function(err, res) {
        if(err) throw err;
        console.log("-----------------------------------------------\nITEM ID | PRODUCT | DEPARTMENT | PRICE | QUANTITY");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------------------");
        menu();
    });
}

function lowInv() {
    var sql = "select * from products having stock_quantity < 5";
    conn.query(sql, function(err, res) {
        if(err) throw err;
        console.log("-----------------------------------------------\nITEM ID | PRODUCT | DEPARTMENT | PRICE | QUANTITY");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------------------");
        menu();
    });
}

function addInv() {

}

function newProd() {

}