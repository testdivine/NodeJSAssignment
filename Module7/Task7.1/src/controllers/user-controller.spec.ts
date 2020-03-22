import UserService from "../service/userservice";
import { Users } from "../models/Users";
import { UserController } from "./user-controller";
// import * as winston from "winston";


const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (data?: any) => {
  return {
    body: data
  };
};

const sequelize: any = {};
const dummyUser: Users = {
  $add: jest.fn(),
  $count: jest.fn(),
  $create: jest.fn(),
  $get: jest.fn(),
  $has: jest.fn(),
  $remove: jest.fn(),
  $set: jest.fn(),
  addHook: jest.fn(),
  changed: jest.fn(),
  createdat: new Date(),
  decrement: jest.fn(),
  destroy: jest.fn(),
  email: "test@email.com",
  equals: jest.fn(),
  equalsOneOf: jest.fn(),
  firstname: "testFirstName",
  get: jest.fn(),
  getDataValue: jest.fn(),
  groups: [],
  hasHook: jest.fn(),
  hasHooks: jest.fn(),
  increment: jest.fn(),
  isNewRecord: false,
  lastname: "testLastName",
  previous: jest.fn(),
  reload: jest.fn(),
  removeHook: jest.fn(),
  restore: jest.fn(),
  save: jest.fn(),
  set: jest.fn(),
  setAttributes: jest.fn(),
  setDataValue: jest.fn(),
  toJSON: jest.fn(),
  update: jest.fn(),
  updatedat: new Date(),
  userid: "1",
  validate: jest.fn(),
  where: jest.fn(),
  createdAt: new Date(),
  deletedAt: new Date(),
  id: "1",
  version: "1.1",
  updatedAt: new Date(),
  sequelize
};

const usersList: Users[] = [];
usersList.push(dummyUser);

const dummyUserService: UserService = {
  insertUser: jest.fn((body: any) => {
    return Promise.resolve(true);
  }),
  deleteUser: jest.fn((id: string) => {
    return Promise.resolve(true);
  }),
  getUser: jest.fn((id: string) => {
    return Promise.resolve(dummyUser);
  }),
  getUsers: jest.fn(() => {
    return Promise.resolve(usersList);
  }),
  updateUser: jest.fn((body: any) => {
    return Promise.resolve(true);
  })
};
const dummyLogger: any = {
  error: jest.fn((message: string) => {return})
};

const userController = new UserController();

describe("UserController", () => {
  // @ts-ignore
  userController.userServiceInstance = dummyUserService;
  // @ts-ignore
  userController.logger = dummyLogger;
  test("should return 200", async () => {
    const user = {
      userid: "1",
      firstname: "Ved",
      lastname: "Vrat",
      email: "ved.vrat@testuser.com",
      createdat: "2018-02-01 00:00:00+05:30",
      updatedat: "2018-02-01 00:00:00+05:30"
    };
    const req = mockRequest(user);
    const res = mockResponse();

    await userController.createUserController(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});