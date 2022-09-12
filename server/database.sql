CREATE DATABASE pern_ecommerce_project;

CREATE TABLE products(
    product_id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE,
    category VARCHAR(20) NOT NULL,
    price NUMERIC(6,2) NOT NULL,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE inventory(
    inventory_id INT NOT NULL PRIMARY KEY,
    product_id SERIAL NOT NULL REFERENCES products(product_id),
    product_name VARCHAR(20) NOT NULL REFERENCES products(name),
    stock INT NOT NULL,
    UNIQUE(product_id)
);

CREATE TABLE orders(
    order_id SERIAL NOT NULL PRIMARY KEY,
    products VARCHAR(255),
    total_price NUMERIC(8,2) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    phone_number INT NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- MOCK DATA --
INSERT INTO products (name, category, price, description) VALUES ('MockBook', 'Laptop', 999.95, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
INSERT INTO inventory (inventory_id, product_id, product_name, stock) VALUES (1, 1, 'MockBook', 0);
INSERT INTO products (name, category, price, description) VALUES ('MockSung', 'Laptop', 699.95, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
INSERT INTO inventory (inventory_id, product_id, product_name, stock) VALUES (2, 2, 'MockSung', 3);
INSERT INTO products (name, category, price, description) VALUES ('Lenofake', 'Laptop', 549.95, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
INSERT INTO inventory (inventory_id, product_id, product_name, stock) VALUES (3, 3, 'Lenofake', 8);
INSERT INTO products (name, category, price, description) VALUES ('Mocker', 'Laptop', 599.95, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
INSERT INTO inventory (inventory_id, product_id, product_name, stock) VALUES (4, 4, 'Mocker', 2);
INSERT INTO products (name, category, price, description) VALUES ('Pear', 'Desktop', 799.95, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
INSERT INTO inventory (inventory_id, product_id, product_name, stock) VALUES (5, 5, 'Pear', 6);
INSERT INTO products (name, category, price, description) VALUES ('Faker', 'Desktop', 999.95, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
INSERT INTO inventory (inventory_id, product_id, product_name, stock) VALUES (6, 6, 'Faker', 14);
INSERT INTO products (name, category, price, description) VALUES ('Mockdion', 'Desktop', 449.95, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
INSERT INTO inventory (inventory_id, product_id, product_name, stock) VALUES (7, 7, 'Mockdion', 0);
INSERT INTO products (name, category, price, description) VALUES ('Hoaxsus', 'Desktop', 749.95, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
INSERT INTO inventory (inventory_id, product_id, product_name, stock) VALUES (8, 8, 'Hoaxsus', 0);

