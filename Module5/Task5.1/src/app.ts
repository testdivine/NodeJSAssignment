import express from "express";
import { Users } from "./models/Users";
import userRoutes from "./routes/user-route";
import groupRoutes from './routes/group-route';
import { Group } from "./models/Group";
import { UserGroup } from "./models/UserGroup";
import userGroupRoutes from "./routes/user_group-route";
import sequelizeManager from "./sequelize-manager";
import * as morgan from 'morgan';

morgan.token('param', (req,res) => {
  return req.params.id;
})

morgan.token('body', (req, res) => {
  return req.body;
});

const loggerFormat = '[:date] :url :method :param :body';


const app = express();
const sequelize = sequelizeManager;

Users.sync();
Group.sync();
UserGroup.sync();

app.use(express.json());
app.use(morgan.default(loggerFormat, {}));
app.use('/userapi', userRoutes);
app.use('/groupapi', groupRoutes);
app.use('/mapusergroup', userGroupRoutes);

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

export default app;
