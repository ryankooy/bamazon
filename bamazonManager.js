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
            message: "What would you like to do next?",
            choices: ["VIEW PRODUCTS FOR SALE", "VIEW LOW INVENTORY", "ADD TO INVENTORY", "ADD NEW PRODUCT", "EXIT"]
        }
    ]).then(function(ans) {
        switch(ans.options) {
            case "VIEW PRODUCTS FOR SALE":
                forSale();
                break;
            case "VIEW LOW INVENTORY":
                lowInv();
                break;
            case "ADD TO INVENTORY":
                addInv();
                break;
            case "ADD NEW PRODUCT":
                newProd();
                break;
            case "EXIT":
                conn.end();
                break; 
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
    var sql = "select * from products";
    conn.query(sql, function(err, res) {
        if(err) throw err;
        console.log("-----------------------------------------------\nITEM ID | PRODUCT | DEPARTMENT | PRICE | QUANTITY");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------------------");
        addInvPrompt();
    });
}


function addInvPrompt() {
    inquirer.prompt([
    {
        name: "item_id",
        type: "input",
        message: "Please enter the Item ID of the product:"
    },
    {
        name: "units",
        type: "input",
        message: "How many units of this item would you like to add to inventory?"
    }
    ]).then(function(ans) {
        conn.query("select * from products where ?", {item_id: ans.item_id}, function(err, res) {
            if(err) throw err;
            if(res[0] === undefined) {
                console.log("We do not carry an item with that ID.");
                setTimeout(function() { menu(); }, 1500);
            } else {
                var add = res[0].stock_quantity += ans.units;
                conn.query("update products set ? where ?", [
                    {
                        stock_quantity: add
                    },
                    {
                        item_id: ans.item_id
                    }
                ], function(err) {
                    if(err) throw err;
                    console.log("You have added " + ans.units + " unit(s) of the item " + res[0].product_name + ".\nIts total quantity is now " + res[0].stock_quantity + ".");
                    setTimeout(function() { menu(); }, 1500);
                });
            }
        });
    });
}

function newProd() {
    
}
