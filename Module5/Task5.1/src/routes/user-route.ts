import express from "express";
import UserService from "../service/userservice";
import UserGroupService from "../service/usergroupserice";

const userRoutes = express.Router();

const userServiceInstance = new UserService();
const userGroupServiceInstance = new UserGroupService();

userRoutes.post("/create", async (req, res) => {
  userServiceInstance.insertUser(req.body).then(result => {
    if (result) {
      res.status(201).send("Data inserted successfully");
    } else {
      res.status(502).send("Error in data insertion");
    }
  });
});

userRoutes.post("/update/:id", async (req, res) => {
  userServiceInstance.updateUser(req.body, req.params.id).then(result => {
    if (result) {
      res.status(200).send("User data updated");
    } else {
      res.status(502).send("Error in updating data");
    }
  });
});

userRoutes.get("/getusers", async (req, res) => {
  userServiceInstance
    .getUsers()
    .then(result => {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(200).send("No users in DB");
      }
    })
    .catch(error => {
      res.status(503).send("Error in getting data");
    });
});

userRoutes.get("/getuser/:id", async (req, res) => {
  userServiceInstance
    .getUser(req.params.id)
    .then(result => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(200).send("User not found");
      }
    })
    .catch(error => {
      res.status(502).send("Error is getting data");
    });
});

userRoutes.delete("/delete/:id", async (req, res) => {
  userServiceInstance.deleteUser(req.params.id).then(value => {
    if (value) {
      userGroupServiceInstance
        .deleteDataByUserId(req.params.id)
        .then(result => {
          if (result) {
            res
              .status(200)
              .send("User deleted successfully along with mapping");
          } else {
            res.status(502).send("Error in removing mapping");
          }
        })
        .catch(error => {
          res.send(502).send("Error in executing request");
        });
    } else {
      res.status(502).send("Error in executing the request");
    }
  });
});

export default userRoutes;
