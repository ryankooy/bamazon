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
    inquirer.prompt([
        {}
    ]).then(function(ans) {
        var sql = "select departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales";
        sql += "from departments inner join products on (departments.department_name = products.department_name and departments.product_sales = products.product_sales)";
        sql += "where (departments.department_name = ? and products.department_name = ?)";
        sql += "order by departments.department_id, departments.department_name, departments.over_head_costs, departments.product_sales;";
        conn.query(sql, [ans.department_name, ans.department_name], function(err, res) {
            if(err) throw err;
            console.log("-----------------------------------------------\nITEM ID | PRODUCT | DEPARTMENT | PRICE | QUANTITY");
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
            }
            console.log("-----------------------------------------------");
            menu();
        });
    });
}

function newDep() {

}