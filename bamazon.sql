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

alter table products
add product_sales int;

alter table products
drop product_sales;

alter table products
add product_sales decimal(10, 2) null;

insert into

SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist
FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year = top5000.year)
WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position;

select departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales
from departments inner join products on (departments.department_name = products.department_name and departments.product_sales = products.product_sales)
where (departments.department_name = ? and products.department_name = ?)
order by departments.department_id, departments.department_name, departments.over_head_costs, departments.product_sales;