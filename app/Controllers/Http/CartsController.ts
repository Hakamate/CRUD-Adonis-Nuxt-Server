import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";
import Cart from "App/Models/Cart";

export default class CartsController {
    async createCart({response}) {
        try {
            // const data = request.all();
            const currentUser = await User.find(1)

            if(currentUser){
                const cart = new Cart()
                cart.name = "TestCartName"

                const relation = await cart.related('user').associate(currentUser)
                
                console.log(currentUser);

                return response.json({
                    status: "success",
                    data: relation
                });
            }
        } catch (error) {
            console.log(error);
            const messageReg = error.detail.match(/[^=]*$/)[0]
            return response.status(400).json({
                status: "error",
                message: `« ${messageReg}`,
            });
        }
    }

    async getCart({request}:HttpContextContract){
        const { email } = request.only(["email"]);
        try {
            const user = await User.findBy('email', email )
            console.log(user);
            
        } catch (error) {
            console.log(error.message);
        }
    }


    // TODO: Want to get Cart (warning : need FK in User)
}
