import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Products from 'App/Models/Product';

export default class ProductsController {
  public async getProducts() {
    
    const products = await Products.all();
    
    return products;
  }
  
  public async getOneProduct({request} : HttpContextContract) {

    const id = request.only(['id']).id;
    
    const product = await Products.find(id);
    
    return product;
  }

  public async deleteProduct({request} : HttpContextContract) {

    const id = request.all().params.id;
    const product = await Products.find(id);
    
    if(product) await product.delete();
    
    return product;
  }

  public async updateProduct({request} : HttpContextContract) {

    const params = request.all().params;
    
    const product = await Products.query()
      .where('id', params.id)
      .update(params.product)

    return product;
  }

  public async storeProducts({request} : HttpContextContract){
    
    const data = request.all().params;
    // const data = request.only(['title', 'price', 'image']);

    const products = await Products.create(data)

    return products;
  }

}
