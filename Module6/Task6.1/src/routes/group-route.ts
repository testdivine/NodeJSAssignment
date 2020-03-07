import express from "express";
import GroupService from "../service/groupservice";
import UserGroupService from "../service/usergroupserice";
import * as winston from "winston";

const groupRoutes = express.Router();
const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [new winston.transports.Console()]
});
const groupServiceInstance = new GroupService();
const userGroupServiceInstance = new UserGroupService();

groupRoutes.post("/create", async (req, res) => {
  groupServiceInstance
    .addGroup(req.body)
    .then(result => {
      if (result) {
        res.status(201).send("Data inserted successfully");
      } else {
        res.status(502).send("Error in data insertion");
      }
    })
    .catch(error => {
      logger.error(
        "Method: Group-Create Args:" + req.body + " ErrorMessage:" + error
      );
      res.status(503).send("Error in inserting data");
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
      logger.error("Method: Group-GetGroups ErrorMessage:" + error);
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
      logger.error(
        "Method: Group-GetGroup Args:" +
          req.params.id +
          "ErrorMessage:" +
          error
      );
      res.status(502).send("Error in getting data");
    });
});

groupRoutes.delete("/delete/:id", async (req, res) => {
  groupServiceInstance.removeGroup(req.params.id).then(value => {
    if (value) {
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
          logger.error(
            "Method: Group-Delete Args:" +
              req.params.id +
              "ErrorMessage:" +
              error
          );
          res.status(503).send("Error in executing the request");
        });
    } else {
      res.status(502).send("Error in executing the request");
    }
  });
});

groupRoutes.post("/update/:id", async (req, res) => {
  groupServiceInstance
    .updateGroup(req.body, req.params.id)
    .then(result => {
      if (result) {
        res.status(200).send("Group updated successfully");
      } else {
        res.status(200).send("Error in updating data");
      }
    })
    .catch(error => {
      logger.error(
        "Method: Group-Update Args:" +
          req.params.id +
          ", " +
          req.body +
          "ErrorMessage:" +
          error
      );
      res.status(503).send("Error in updating the data");
    });
});

export default groupRoutes;
