const secret = "node_task_secret";
import * as jwt from "jsonwebtoken";
import { Users } from "../models/Users";

export default class AuthService {
  static async login(username: string, password: string) {
    const user = await Users.findOne({
      where: { firstname: username, lastname: password }
    });
    if (!user) {
      return {
        success: false,
        message: "Bas username/password"
      };
    }

    const payload = { sub: user.userid };
    const token = jwt.sign(payload, secret, { expiresIn: 120 });
    return {
      success: true,
      token
    };
  }
}
