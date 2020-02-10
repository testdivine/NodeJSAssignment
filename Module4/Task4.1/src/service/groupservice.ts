import { Group } from "../models/Group";

export default class GroupService {
  async addGroup(body: any): Promise<boolean> {
    try {
      console.log(body);
      await Group.create(body);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async updateGroup(body: any, groupId: string): Promise<boolean> {
    try {
      await Group.update(body, { where: { id: groupId } });
      return true;
    } catch (e) {
      return false;
    }
  }

  async getAllGroups(): Promise<Group[]> {
    try {
      const groupList = await Group.findAll();
      return groupList;
    } catch (e) {
      throw e;
    }
  }

  async getGroup(groupId: string): Promise<Group> {
    try {
      const group = await Group.findOne({ where: { id: groupId } });
      return group;
    } catch (e) {
      throw e;
    }
  }

  async removeGroup(groupId: string): Promise<boolean> {
    try {
      await Group.destroy({ where: { id: groupId } });
      return true;
    } catch (e) {
      return false;
    }
  }
}
