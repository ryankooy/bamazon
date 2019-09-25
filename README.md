# Bamazon App

Bamazon App is a Node.js app that allows users to manipulate a mock store and inventory within the command line; the associated data is stored in a MySQL database.

## Instructions For Running Bamazon

This app has a three-part structure, providing access to the store's products and/or departments in the form of a user's choice to act as either Customer, Manager, or Supervisor.

### Customer

By typing `node bamazonCustomer.js`, a user is shown a table of the current products for sale and asked for the Item ID and desired quantity of an item.

![bamazonCustomer demo](https://media.giphy.com/media/h86dVWLuRWDb4oNO4l/giphy.gif)

### Manager

Typing `node bamazonManager.js` shows the user a list of several Manager-role options from which to select.

`VIEW PRODUCTS FOR SALE` displays a table of the entire inventory, with `VIEW LOW INVENTORY` presenting the user with items having counts lower than five:

<img src="/bamazonMv.png" width="500" />

A user can choose `ADD TO INVENTORY` to increase the count of a specified item:

![bamazonManager demo - adding to inventory](https://media.giphy.com/media/LSjPV6RxN9wle7GAaB/giphy.gif)

Finally, a Manager-role user is able to use `ADD NEW PRODUCT`to create a new item to add to the inventory:

![bamazonManager demo - adding new product](https://media.giphy.com/media/hXI8nfLoIHzpQAoaDr/giphy.gif)

### Supervisor

Entering `node bamazonSupervisor.js` into the CLI will provide the user with a list of the store's departments, as well as give the user the ability to create new departments using the list option `CREATE NEW DEPARTMENT`:

![bamazonSupervisor demo](https://media.giphy.com/media/UvVJA1R3Fumkk2x5Gm/giphy.gif)

<img src="/bamazonSshot 0" width="500" />

## Technologies Used

This Bamazon app is dependent on multiple modules, packages, applications, and technologies, incorporating:

* **Node.js**, the CLI
* **MySQL Workbench**, for viewing and updating database tables
* **mysql**, a Node package for connecting and making queries to the database
* **SQL**, the language used for interacting with the database
* **Inquirer.js**, a package for the CLI prompts and capturing user input
* **cli-table**, the package used for the tables displayed in the CLI
