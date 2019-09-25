drop database if exists bamazon;

create database bamazon;

use bamazon;

create table products (
    id int not null auto_increment,
    item_id int null,
    product_name varchar(100) not null,
    department_name varchar(50) not null,
    price decimal(5, 2) not null,
    stock_quantity int default 0 not null,
    primary key (id)
);

select * from products;

insert into products (item_id, product_name, department_name, price, stock_quantity)
values (29384, "Pitzman's Mustard", "Grocery", 3.49, 12),
(49302, "Cinco B'Owl Toy", "Children/Toys", 14.99, 3),
(79320, "Cinco C-Phone", "Electronics", 69.99, 5),
(29356, "Tittleman's Crust Deep Dish Pizza", "Grocery", 8.99, 9),
(19348, "'Rascal's Modern Life'", "Entertainment", 12.99, 23),
(29341, "Cinco MyEggs", "Grocery", 10.99, 6),
(69388, "D'Jones Anti-D Caplets", "Medicines", 7.49, 15),
(19354, "The Shrekoning", "Entertainment", 12.99, 14),
(49329, "Jefferton Alive! Board Game", "Children/Toys", 12.99, 4);

use bamazon;

update products
set product_name="'The Shrekoning'"
where item_id=19354;

create table departments (
    id int not null auto_increment,
    department_id int null,
    department_name varchar(20) null,
    over_head_costs int null,
    primary key (id)
);

use bamazon;

select * from departments;

select departments.department_id, departments.department_name, departments.over_head_costs, sum(products.product_sales) as sales,
sum(products.product_sales)-departments.over_head_costs as total_profit
from products inner join departments on products.department_name = departments.department_name;
