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

  public async storeOneProduct({ request, response }: HttpContextContract) {
    try {
      //for Insomnia
      // const selectedProduct = request.only(['title', 'price', 'image', 'description']);
      const selectedProduct = request.all().params;
      const product = await Products.create(selectedProduct)

      if (product) {
        globalMethods.returnResponse("Adding product successfully !", "success", response, product)
      }
    } catch (error) {
      globalMethods.returnResponse(error.message, 'error' , response)
    }
  }

  public async storeProducts({ request, response }: HttpContextContract) {
    try {
      //for Insomnia
      const products:any = request.all();
      const arrayProducts = Object.values(products)
      
      arrayProducts.forEach(async(product:object) => {
        await Products.create(product)
      })

      return response.json({
        status: "200",
        message: "Done"
      })
    } 
    catch (error) {
      console.log(error);
    }
  }

}
