import express from "express";
import GroupService from "../service/groupservice";
import UserGroupService from "../service/usergroupserice";

const groupRoutes = express.Router();

const groupServiceInstance = new GroupService();
const userGroupServiceInstance = new UserGroupService();

groupRoutes.post("/create", async (req, res) => {
  groupServiceInstance.addGroup(req.body).then(result => {
    if (result) {
      res.status(201).send("Data inserted successfully");
    } else {
      res.status(502).send("Error in data insertion");
    }
  });
});

groupRoutes.get("/getgroups", async (req, res) => {
  groupServiceInstance
    .getAllGroups()
    .then(result => {
      if (result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(200).send("No such group in DB");
      }
    })
    .catch(error => {
      res.status(503).send("Error in getting data");
    });
});

groupRoutes.get("/getgroup/:id", async (req, res) => {
  groupServiceInstance
    .getGroup(req.params.id)
    .then(result => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(200).send("Group not found");
      }
    })
    .catch(error => {
      res.status(502).send("Error in getting data");
    });
});

groupRoutes.delete("/delete/:id", async (req, res) => {
  groupServiceInstance.removeGroup(req.params.id).then(result => {
    if (result) {
      userGroupServiceInstance
        .deleteDataByGroupId(req.params.id)
        .then(result => {
          if (result) {
            res
              .status(200)
              .send("Group deleted successfully along with mapping");
          } else {
            res.status(502).send("Error in removing mapping");
          }
        })
        .catch(error => {
          res.status(502).send("Error in executing the request");
        });
    } else {
      res.status(502).send("Error in executing the request");
    }
  });
});

groupRoutes.post("/update/:id", async (req, res) => {
  groupServiceInstance.updateGroup(req.body, req.params.id).then(result => {
    if (result) {
      res.status(200).send("Group updated successfully");
    } else {
      res.status(200).send("Error in updating data");
    }
  });
});

export default groupRoutes;
