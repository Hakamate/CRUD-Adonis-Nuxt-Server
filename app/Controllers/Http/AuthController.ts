import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";

export default class AuthController {
  async register({ request, auth, response }: HttpContextContract) {
    const userData = request.only(["email", "password"]);
    try {
      await User.create(userData);

      const token = await auth.attempt(userData.email, userData.password);

      return response.json({
        status: "success",
        data: token,
      });
    } catch (error) {
      console.log(error);
      return response.status(400).json({
        status: "error",
        message:
          "There was a problem creating the user, please try again later.",
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
