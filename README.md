# Bamazon App

Bamazon App is a Node.js app that allows users to manipulate a mock store and inventory within the command line; the associated data is stored in a MySQL database.

## Instructions For Running Bamazon

This app has a three-part structure, providing access to the store's products and/or departments in the form of a user's choice whether to act as Customer, Manager, or Supervisor.

### Customer

`node bamazonCustomer.js`

![bamazonCustomer demo](https://media.giphy.com/media/h86dVWLuRWDb4oNO4l/giphy.gif)

### Manager

`node bamazonManager.js`

<img src="/bamazonMv.png" width="500" />

![bamazonManager demo - adding to inventory](https://media.giphy.com/media/LSjPV6RxN9wle7GAaB/giphy.gif)

![bamazonManager demo - adding new product](https://media.giphy.com/media/hXI8nfLoIHzpQAoaDr/giphy.gif)

### Supervisor

`node bamazonSupervisor.js`

## Technologies Used

This Bamazon app is dependent on multiple modules, packages, applications, and technologies, incorporating:

* **Node.js**, the CLI
* **MySQL Workbench**, for viewing and updating database tables
* **mysql**, a Node package for connecting and making queries to my database
* **SQL**, the languaged used for interacting with my database
* **Inquirer.js**, a package for the CLI prompts and capturing user input
* **cli-table**, the package used for the tables displayed in the CLI
