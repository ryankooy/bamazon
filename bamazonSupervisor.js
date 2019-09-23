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
            colWidths: [17, 20, 17, 15, 15]
        });
        for (var i = 0; i < 5; i++) {
            table.push(
                [res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].product_sales, res[i].total_profit]
            );
        }
        console.log(table.toString());
        menu();
    });
}

function newDep() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Enter the new department name:"
        },
        {
            name: "costs",
            type: "input",
            message: "What are the overhead costs of this department?"
        },
        {
            name: "ID",
            type: "input",
            message: "Please create a department ID:"
        }
    ]).then(function(ans) {
        var sql = "insert into departments set ?";
        conn.query(sql,
        [
            {
                department_name: ans.name,
                over_head_costs: ans.costs,
                department_id: ans.ID
            }
        ], function(err) {
            if(err) throw err;
            menu();
        });
    });
}