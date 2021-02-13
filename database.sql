
create TABLE product(
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255),
    price INTEGER,
    product_description VARCHAR(255)
);

create TABLE discount(
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255),
    discount INTEGER,
    start_discount DATE,
    end_discount DATE,
    product_id INTEGER,
    FOREIGN KEY (product_id) REFERENCES product(id)
);