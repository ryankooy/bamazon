var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

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
            message: "What would you like to do?",
            choices: ["VIEW PRODUCT SALES BY DEPARTMENT", "CREATE NEW DEPARTMENT", "EXIT"]
        }
    ]).then(function(ans) {
        switch(ans.options) {
            case "VIEW PRODUCT SALES BY DEPARTMENT":
                prodSales();
                break;
            case "CREATE NEW DEPARTMENT":
                newDep();
                break;
            case "EXIT":
                conn.end();
                break;
        }
    });
}

function prodSales() {
    var sql = "select departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales, products.product_sales-departments.over_head_costs as total_profit from products, departments;";
    conn.query(sql, function(err, res) {
        if(err) throw err;
        var table = new Table({
            head: ["Department ID", "Department Name", "Overhead Costs", "Product Sales", "Total Profit"],
            colWidths: [20, 20, 20, 15, 15]
        });
        table.push(
            ['First value', 'Second value', 'asdfdas', 'asdlfsd', 'asdfsd'],
            ['First value', 'Second value', 'asdfdas', 'asdlfsd', 'asdfsd']
        );
        console.log(table.toString());
        menu();
    });
}

function newDep() {

}