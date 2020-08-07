import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";

// import {
//   rules, // 👈
//   schema,
// } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
  async register({ request, auth, response }: HttpContextContract) {

    // remplace unique constraint by validate schema
    // then() -> not exizting
    // catch() -> already register
    // // // // // // request.validate({
    // // // // // //   schema: schema.create({
    // // // // // //     email: schema.string(
    // // // // // //       {trim:true},
    // // // // // //       [
    // // // // // //         rules.email(),
    // // // // // //         rules.unique({table:'users',column:'email'}),
    // // // // // //       ],
    // // // // // //     ),
    // // // // // //   })
    // // // // // // }).then((res)=>{
    // // // // // //   console.log({res});
    // // // // // // }).catch((ress)=>{
    // // // // // //   console.log({ress});
    // // // // // // })

    try {
      const userData = request.only(["email", "password"]);
      await User.create(userData);

      const token = await auth.attempt(userData.email, userData.password);
      console.log(auth);
      const user = auth.user
      console.log(user);
      return response.json({
        status: "success",
        data: token,
      });
    } catch (error) {
      console.log(error);
      const messageReg = error.detail.match(/[^=]*$/)[0]
      return response.status(400).json({
        status: "error",
        message: `« ${messageReg}`,
      });
    }
  }

  async login({ request, auth, response }) {
    const { email, password } = request.only(["email", "password"]);
    try {
      const token = await auth.attempt(email, password);

      return response.json({
        status: "success",
        data: token,
      });
    } catch (error) {

      const messageReg = error.message.match(/[^:]*$/)[0]
      
      response.status(400).json({
        status: "error",
        message: messageReg,
      });
    }
  }

  async me({ auth, response }) {
    return response.json({
      status: "success",
      data: auth.user,
    });
  }
}
