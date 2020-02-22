import express from "express";
import UserGroupService from "../service/usergroupserice";

const userGroupRoutes = express.Router();

const userGroupServiceInstance = new UserGroupService();

userGroupRoutes.post("/:id", async (req, res) => {
  userGroupServiceInstance
    .addUsersToGroup(req.params.id, req.body.userids)
    .then(result => {
      if (result) {
        res.status(200).send("User mapped to group");
      } else {
        res.status(200).send("User can not mapped to group");
      }
    })
    .catch(error => {
      res.status(503).send("Error in mapping data");
    });
});

export default userGroupRoutes;
