# CRUD-Adonis-Nuxt-Server

**CRUD-Adonis-Nuxt-Server** is an prototype API to create a easy and simple "Shop" with some feature which allow you to add product, or buy others.
This project is used to my frontend prototype [CRUD-Adonis-Nuxt-Front](https://github.com/Hakamate/CRUD-Adonis-Nuxt-Front).

## Features
<b>Products Features</b>

| Feature  |  Coded       | Description  |
|----------|:-------------:|:-------------|
| Add Product | &#10004; | Add a Product on DataBase |
| List Products | &#10004; | Listing all Products |
| Edit Product | &#10004; | Editing a Product to change values |
| Delete Product | &#10004; | Removing a Product from Database|

<b>User Features</b>

| Feature  |  Coded?       | Description  |
|----------|:-------------:|:-------------|
| Login | &#10004; | Allow User to be connected |
| LogOut | &#10004; | Allow User to be disconnected |
| Register | &#10004; | Allow Guest to create an Account |
| Rules | &#10060; | Allow specific actions for specific Users |

## Routes
<b>Available routes</b>

```typescript
Route.group(() => {
  Route.get('/getproducts', 'ProductsController.getProducts')
  Route.get('/getproduct', "ProductsController.getOneProduct")
  Route.post('/updateproduct', "ProductsController.updateProduct")
  Route.post('/deleteproduct', "ProductsController.deleteProduct")
  Route.post('/storeproduct', "ProductsController.storeOneProduct")
  Route.post('/storeproducts', "ProductsController.storeProducts")

  Route.post("login", "AuthController.login");
  Route.post("register", "AuthController.register");
  Route.get("me", "AuthController.me").middleware('auth')
}).prefix('api')
```

## Technologies

- AdonisJS (NodeJS Framework --> Backend)
- Postgre SQL (SGBDR)


## How to build setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3333
$ node ace serve --watch

# build for production and launch server
$ node ace build
```

