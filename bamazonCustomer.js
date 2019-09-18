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
            if(res[0] === undefined) {
                console.log("We do not carry an item with that ID.");
                setTimeout(function() { whatNow(); }, 1500);
            } else if(res[0].stock_quantity === 0) {
                console.log("Sorry, we're plumb out of " + res[0].product_name + "!");
                setTimeout(function() { whatNow(); }, 1500);
            } else if(res[0].stock_quantity < ans.units) {
                console.log("We have " + res[0].stock_quantity + " in stock. Please select a lower quantity.");
                setTimeout(function() { whatNow(); }, 1500);
            } else {
                var deduct = res[0].stock_quantity -= ans.units;
                var total = res[0].price;
                conn.query("update products set ? where ?",
                [
                    {
                        stock_quantity: deduct
                    },
                    {
                        item_id: ans.item_id
                    }
                ], function(err) {
                    if(err) throw err;
                    if(total > 1) {
                        total *= ans.units;
                    }
                    conn.query("update products set ? where ?",
                    [
                        {
                            product_sales: total
                        },
                        {
                            item_id: ans.item_id
                        }
                    ], function(err) {
                        if(err) throw err;
                    });
                    console.log("You have purchased " + ans.units + " unit(s) of the item " + res[0].product_name + ".\nYour total is $" + total + ".");
                    setTimeout(function() { whatNow(); }, 1500);
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
            choices: ["PURCHASE ANOTHER ITEM", "EXIT"]
        }
    ]).then(function(ans) {
        if(ans.next === "PURCHASE ANOTHER ITEM") {
            displayProducts();
        } else {
            conn.end();
        }
    });
}