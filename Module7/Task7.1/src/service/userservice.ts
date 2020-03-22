import { Users } from "../models/Users";
import {Singleton} from 'typescript-ioc';

@Singleton
export default class UserService {
  async insertUser(body: any): Promise<boolean> {
    try {
      await Users.create(body);
      return true;
    } catch (e) {
      return false;
    }
  }

  async getUsers(): Promise<Users[]> {
    try {
      const userlist = await Users.findAll();
      return userlist;
    } catch (e) {
      throw e;
    }
  }

  async getUser(id: string): Promise<Users> {
    try {
      const user = await Users.findOne({ where: { userid: id } });
      return user;
    } catch (e) {
      throw e;
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      await Users.destroy({ where: { userid: id } });
      return true;
    } catch (e) {
      return false;
    }
  }

  async updateUser(body: any, id: string): Promise<boolean> {
    try {
      await Users.update(body, { where: { userid: id } });
      return true;
    } catch (e) {
      return false;
    }
  }
}
