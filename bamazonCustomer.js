var mysql = require("mysql");
var inquirer = require("inquirer");
// var moment = require("moment");

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
        console.log("-----------------------------------------------\nITEM ID | PRODUCT | DEPARTMENT | PRICE | QUANTITY");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------------------");
        prodId();
    });
}

function prodId() {
    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message: "Please enter the Item ID of the product you would like to buy:"
        },
        {
            name: "units",
            type: "input",
            message: "How many units of this item would you like to buy?"
        }
    ]).then(function(ans) {
        conn.query("select * from products where ?", {item_id: ans.item_id}, function(err, res) {
            if(err) throw err;
            if(res[0].stock_quantity === 0) {
                console.log("Sorry, we're plumb out of " + res[0].product_name + "!");
            } else {
                var deduct = res[0].stock_quantity -= ans.units;
                var total;
                conn.query("update products set ? where ?",
                [
                    {
                        stock_quantity: deduct
                    },
                    {
                        item_id: ans.item_id
                    }
                ], function(err, res2) {
                    if(err) throw err;
                    total = (res[0].price);
                    console.log("You have purchased " + ans.units + " units of the item " + res[0].product_name + ".\nYour total is $" + total + ".");
                    setTimeout(function() { whatNow(); }, 1000);
                });
            }
        });
    });
}

function whatNow() {
    inquirer.prompt([
        {
            name: "next",
            type: "list",
            message: "What would you like to do now?",
            choices: ["VIEW CART", "PURCHASE ANOTHER ITEM", "EXIT"]
        }
    ]).then(function(ans) {
        if(ans.next === "VIEW CART") {
            console.log("Okay");
        } else if(ans.next === "PURCHASE ANOTHER ITEM") {
            displayProducts();
        } else {
            conn.end();
        }
    });
}