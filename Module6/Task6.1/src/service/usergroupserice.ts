import { UserGroup } from "../models/UserGroup";
import sequelizeManager from "../sequelize-manager";
import { Transaction } from "sequelize/types";

const sequelize = sequelizeManager;

export default class UserGroupService {
  async addUsersToGroup(groupId: string, userIds: string[]): Promise<boolean> {
    const promise = new Promise<boolean>(
      (resolve: any, reject: any) => {
        sequelize.transaction((t: Transaction) => {
          for (const uid of userIds) {
            const data = {
              groupId,
              userId: uid
            };
            return UserGroup.create(data)
              .then(result => {
                return resolve(true);
              })
              .catch(error => reject(false));
          }
        });
      }
    );
    return promise;
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
