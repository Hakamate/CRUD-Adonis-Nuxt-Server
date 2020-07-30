import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Products from 'App/Models/Product';

export default class ProductsController {
  public async getProducts() {
    
    const products = await Products.all();
    
    return products;
  }

  public async storeProducts({request} : HttpContextContract){
    
    const data = request.all().params;
    // const data = request.only(['title', 'price', 'image']);

    console.log(data)
    const products = await Products.create(data)

    return products;
  }

}
