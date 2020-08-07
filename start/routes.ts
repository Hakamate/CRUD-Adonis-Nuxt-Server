/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.get('/getproducts', 'ProductsController.getProducts')
  Route.get('/getproduct', "ProductsController.getOneProduct")
  Route.post('/updateproduct', "ProductsController.updateProduct")
  Route.post('/deleteproduct', "ProductsController.deleteProduct")
  Route.post('/storeproduct', "ProductsController.storeOneProduct")
  Route.post('/storeproducts', "ProductsController.storeProducts")
  
  Route.post('/createcart', "CartsController.createCart")
  Route.get('/getcart', "CartsController.getCart")
  

  Route.post("login", "AuthController.login");
  Route.post("register", "AuthController.register");
  Route.get("me", "AuthController.me").middleware('auth')
}).prefix('api')