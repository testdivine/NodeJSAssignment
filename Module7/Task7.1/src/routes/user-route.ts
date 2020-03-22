import express from "express";
// import UserService from "../service/userservice";
// import UserGroupService from "../service/usergroupserice";
// import * as winston from "winston";
import { UserController } from "../controllers/user-controller";

const userRoutes = express.Router();
// const logger = winston.createLogger({
//   format: winston.format.json(),
//   transports: [new winston.transports.Console()]
// });
// const userServiceInstance = new UserService();
// const userGroupServiceInstance = new UserGroupService();
const userController = new UserController();

// userRoutes.post("/create", async (req, res) => {
//   userServiceInstance
//     .insertUser(req.body)
//     .then(result => {
//       if (result) {
//         res.status(201).send("Data inserted successfully");
//       } else {
//         res.status(503).send("Error in data insertion");
//       }
//     })
//     .catch(error => {
//       logger.error(
//         "Method: User-Create Args:" + req.body + " ErrorMessage:" + error
//       );
//       res.status(503).send("Error in creating user");
//     });
// });

userRoutes.post("/create", userController.createUserController);
userRoutes.post("/update/:id", userController.updateUserController);

// userRoutes.post("/update/:id", async (req, res) => {
//   userServiceInstance
//     .updateUser(req.body, req.params.id)
//     .then(result => {
//       if (result) {
//         res.status(200).send("User data updated");
//       } else {
//         res.status(502).send("Error in updating data");
//       }
//     })
//     .catch(error => {
//       logger.error(
//         "Method: User-Update Args:" +
//           req.body +
//           ", " +
//           req.params.id +
//           " ErrorMessage:" +
//           error
//       );
//       res.status(503).send("Error in updating user");
//     });
// });

userRoutes.get("/getusers", userController.getUsersController);
// userRoutes.get("/getusers", async (req, res) => {
//   userServiceInstance
//     .getUsers()
//     .then(result => {
//       if (result.length > 0) {
//         res.status(200).json(result);
//       } else {
//         res.status(200).send("No users in DB");
//       }
//     })
//     .catch(error => {
//       logger.error("Method: User-GetUsers " + " ErrorMessage:" + error);
//       res.status(503).send("Error in getting data");
//     });
// });

userRoutes.get("/getuser/:id", userController.getUserController);
// userRoutes.get("/getuser/:id", async (req, res) => {
//   userServiceInstance
//     .getUser(req.params.id)
//     .then(result => {
//       if (result) {
//         res.status(200).json(result);
//       } else {
//         res.status(200).send("User not found");
//       }
//     })
//     .catch(error => {
//       logger.error(
//         "Method: User-GetUser Args:" + req.params.id + " ErrorMessage:" + error
//       );
//       res.status(503).send("Error is getting data");
//     });
// });

userRoutes.delete("/delete/:id", userController.deleteUserController);
// userRoutes.delete("/delete/:id", async (req, res) => {
//   userServiceInstance
//     .deleteUser(req.params.id)
//     .then(value => {
//       if (value) {
//         userGroupServiceInstance
//           .deleteDataByUserId(req.params.id)
//           .then(result => {
//             if (result) {
//               res
//                 .status(200)
//                 .send("User deleted successfully along with mapping");
//             } else {
//               res.status(503).send("Error in removing mapping");
//             }
//           })
//           .catch(error => {
//             logger.error(
//               "Method: UserGroup-DeleteData Args:" +
//                 req.params.id +
//                 " ErrorMessage:" +
//                 error
//             );
//             res.send(503).send("Error in executing request");
//           });
//       } else {
//         res.status(503).send("Error in executing the request");
//       }
//     })
//     .catch(error => {
//       logger.error(
//         "Method: User-Delete Args:" + req.params.id + " ErrorMessage:" + error
//       );
//       res.status(503).send("Error in executing the request");
//     });
// });

export default userRoutes;
