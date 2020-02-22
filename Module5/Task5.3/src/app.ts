import express, { Request, Response, NextFunction } from "express";
import { Users } from "./models/Users";
import userRoutes from "./routes/user-route";
import groupRoutes from "./routes/group-route";
import { Group } from "./models/Group";
import { UserGroup } from "./models/UserGroup";
import userGroupRoutes from "./routes/user_group-route";
import sequelizeManager from "./sequelize-manager";
import * as winston from "winston";

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.Console()
  ]
});
const app = express();
const sequelize = sequelizeManager;

Users.sync();
Group.sync();
UserGroup.sync();

app.use(express.json());
app.use("/userapi", userRoutes);
app.use("/groupapi", groupRoutes);
app.use("/mapusergroup", userGroupRoutes);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Expose-Headers", "x-total-count");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type,authorization");
  next();
});

app.get("/testconnection", (req, res) => {
  sequelize
    .authenticate()
    .then(() => {
      res.status(200).send("DB Connection established successfully");
    })
    .catch(error => {
      res.status(500).send("Error while establishing DB Connection");
    });
});

app.use(errorHandle);

function errorHandle(err: any, req: Request, res: Response, next: NextFunction){
  logger.error(err);
  if(res.headersSent) {
    next(err);
  }
  res.status(500).send('Internal Server Error');
}

process.on('unhandledRejection', (err) => {
  logger.error(err);
});
process.on('uncaughtException', (err) => {
  logger.error(err.message + ' ErrorStack: ' + err.stack);
  process.exit(1);
});

export default app;
