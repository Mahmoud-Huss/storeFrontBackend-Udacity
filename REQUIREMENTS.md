# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index `'/products' [GET]`
- Show (args: product id) `'/products/:id' [GET]`
- Create (args: Product)[token required] `'/products' [POST]`
- [OPTIONAL] Top 5 most popular products `'/products/top' [GET]`
- [OPTIONAL] Products by category (args: product category) `'/products?category="categoryName"' [GET]`
- Delete (args: product id) `'/products/:id' [DELETE]`

#### Users

- Index [token required] `'/users/' [GET] (token)`
- Show (args: id)[token required] `'/users/:id' [GET] (token)`
- Create (args: User)[token required] `'/register' [POST] (token)`
- Authenticate (args: user) `'/signin' [GET] (token)`
- Delete (args: id) `'/users/:id' [Delete] (token)`

#### Orders

- Current Order by user (args: user id)[token required] `'/users/:id/current-order' [GET] (token)`
- [OPTIONAL] Completed Orders by user (args: user id)[token required] `'/users/:id/complete-orders' [GET] (token)`
- Index `'/users/:id/orders' [GET] (token)`
- Create `'/users/:id/orders' [POST] (token)`
- Add Product `'/orders/:id/products' [POST] (token)`
- Update status `'/orders/:id/status' [POST] (token)`
- Delete `'/orders/:id' [DELETE] (token)`

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id `SERIAL PRIMARY KEY`
- firstName `VARCHAR`
- lastName `VARCHAR`
- username `VARCHAR`
- password `VARCHAR`

#### Orders

- id `SERIAL PRIMARY KEY`
- user_id `BIGINT`
- status of order (active or complete) `VARCHAR(64)`

### Order_products

- id `SERIAL PRIMARY KEY`
- product_id `BIGINT`
- order_id `BIGINT`
- quantity of each product in the order `INTEGER`
