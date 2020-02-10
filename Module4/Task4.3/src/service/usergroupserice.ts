import { UserGroup } from "../models/UserGroup";

export default class UserGroupService {
  async addUsersToGroup(groupId: string, userIds: string[]): Promise<boolean> {
    try {
      for (const uid of userIds) {
        const data = {
          "groupId": groupId,
          "userId": uid
        };
        await UserGroup.create(data);
        return true;
      }
    } catch (e) {
      return false;
    }
  }
}
