import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Products from 'App/Models/Product';

import globalMethods from 'App/Services/globalMethods'

export default class ProductsController {

  public async getProducts() {

    const products = await Products.all();
    return products;
  }

  public async getOneProduct({ request }: HttpContextContract) {

    const selectedProductID = request.only(['id']).id;

    const product = await Products.find(selectedProductID);

    return product;
  }

  public async deleteProduct({ request, response }: HttpContextContract) {
    const selectedProductID = request.all().params.id;
    const product = await Products.find(selectedProductID);

    try {
      if (product) {
        await product.delete();
        globalMethods.returnResponse("Deleting product successfully !", "success", response)
      }
    } catch (error) {
      globalMethods.returnResponse(error.message, "error", response)
    }
  }

  public async updateProduct({ request, response }: HttpContextContract) {
    const selectedProduct = request.all().params;

    try {
      await Products.query()
      .where('id', selectedProduct.id)
      .update(selectedProduct.product)

      globalMethods.returnResponse("Updating product successfully !", "success", response)
    } catch (error) {
      globalMethods.returnResponse(error.message, "error", response)
    }
  }

  public async storeProduct({ request, response }: HttpContextContract) {
    try {
      const selectedProduct = request.all().params;
      // const selectedProduct = request.only(['title', 'price', 'image', 'description']);
      const product = await Products.create(selectedProduct)

      if (product) {
        globalMethods.returnResponse("Adding product successfully !", "success", response, product)
      }
    } catch (error) {
      globalMethods.returnResponse(error.message, 'error' , response)
    }
  }

}
