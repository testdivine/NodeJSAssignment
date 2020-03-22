import UserService from "../service/userservice";
import * as winston from "winston";
import UserGroupService from "../service/usergroupserice";
import { Inject } from "typescript-ioc";

export class UserController {
  @Inject
  private userServiceInstance!: UserService;
  @Inject
  private userGroupServiceInstance!: UserGroupService;

  private logger = winston.createLogger({
    format: winston.format.json(),
    transports: [new winston.transports.Console()]
  });

   async createUserController(req: any, res: any) {
    this.userServiceInstance
      .insertUser(req.body)
      .then(result => {
        if (result) {
          res.status(201).send("Data inserted successfully");
        } else {
          res.status(503).send("Error in data insertion");
        }
      })
      .catch(error => {
        this.logger.error(
          "Method: User-Create Args:" + req.body + " ErrorMessage:" + error
        );
        res.status(503).send("Error in creating user");
      });
  }

   async updateUserController(req: any, res: any) {
    this.userServiceInstance
      .updateUser(req.body, req.params.id)
      .then(result => {
        if (result) {
          res.status(200).send("User data updated");
        } else {
          res.status(502).send("Error in updating data");
        }
      })
      .catch(error => {
        this.logger.error(
          "Method: User-Update Args:" +
            req.body +
            ", " +
            req.params.id +
            " ErrorMessage:" +
            error
        );
        res.status(503).send("Error in updating user");
      });
  }

   async getUsersController(req: any, res: any) {
    this.userServiceInstance
      .getUsers()
      .then(result => {
        if (result.length > 0) {
          res.status(200).json(result);
        } else {
          res.status(200).send("No users in DB");
        }
      })
      .catch(error => {
        this.logger.error("Method: User-GetUsers " + " ErrorMessage:" + error);
        res.status(503).send("Error in getting data");
      });
  }

   async getUserController(req: any, res: any) {
    this.userServiceInstance
      .getUser(req.params.id)
      .then(result => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(200).send("User not found");
        }
      })
      .catch(error => {
        this.logger.error(
          "Method: User-GetUser Args:" + req.params.id + " ErrorMessage:" + error
        );
        res.status(503).send("Error is getting data");
      });
  }

   async deleteUserController(req: any, res: any) {
      this.userServiceInstance
      .deleteUser(req.params.id)
      .then(value => {
        if (value) {
          this.userGroupServiceInstance
            .deleteDataByUserId(req.params.id)
            .then(result => {
              if (result) {
                res
                  .status(200)
                  .send("User deleted successfully along with mapping");
              } else {
                res.status(503).send("Error in removing mapping");
              }
            })
            .catch(error => {
              this.logger.error(
                "Method: UserGroup-DeleteData Args:" +
                  req.params.id +
                  " ErrorMessage:" +
                  error
              );
              res.send(503).send("Error in executing request");
            });
        } else {
          res.status(503).send("Error in executing the request");
        }
      })
      .catch(error => {
        this.logger.error(
          "Method: User-Delete Args:" + req.params.id + " ErrorMessage:" + error
        );
        res.status(503).send("Error in executing the request");
      });
  }
}

