import { UserGroup } from "../models/UserGroup";

export default class UserGroupService {
  async addUsersToGroup(groupId: string, userIds: string[]): Promise<boolean> {
    try {
      for (const uid of userIds) {
        const data = {
          groupId: groupId,
          userId: uid
        };
        await UserGroup.create(data);
        return true;
      }
    } catch (e) {
      return false;
    }
  }

  async deleteDataByGroupId(groupId: string): Promise<boolean> {
    try {
      await UserGroup.destroy({ where: { groupid: groupId } });
      return true;
    } catch (e) {
      return false;
    }
  }

  async deleteDataByUserId(userId: string): Promise<boolean> {
    try {
      await UserGroup.destroy({ where: { userid: userId } });
      return true;
    } catch (e) {
      return false;
    }
  }
}
