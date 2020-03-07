import express, { Request, Response, NextFunction } from "express";
import { Users } from "./models/Users";
import userRoutes from "./routes/user-route";
import groupRoutes from "./routes/group-route";
import { Group } from "./models/Group";
import { UserGroup } from "./models/UserGroup";
import userGroupRoutes from "./routes/user_group-route";
import sequelizeManager from "./sequelize-manager";
import * as winston from "winston";
import * as jwt from "jsonwebtoken";
import AuthService from "./service/authService";
import cors from "cors";
import helmet from "helmet";

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [new winston.transports.Console()]
});
const app = express();
const sequelize = sequelizeManager;
const secret = "node_task_secret";

Users.sync();
Group.sync();
UserGroup.sync();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Expose-Headers", "x-total-count");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type,authorization");
  next();
});

app.post("/login", async (req: Request, res: Response) => {
  await AuthService.login(req.body.username, req.body.password)
    .then(result => {
      if (!result.success) {
        return res.status(401).send(result);
      }
      return res.send(result);
    })
    .catch(error => {
      logger.error(error);
      return res
        .status(500)
        .send("Unable to login. Please contact administrator");
    });
});

// async function login(username: string, password: string) {
//   const user = await Users.findOne({
//     where: { firstname: username, lastname: password }
//   });
//   if (!user) {
//     return {
//       success: false,
//       message: "Bas username/password"
//     };
//   }

//   const payload = { sub: user.userid };
//   const token = jwt.sign(payload, secret, { expiresIn: 120 });
//   return {
//     success: true,
//     token
//   };
// }

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

function checkToken(req: any, res: any, next: any) {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .send({ success: false, message: "No token provided" });
  }

  return jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) {
      return res
        .status(403)
        .send({ success: false, message: "Failed to authenticate token." });
    }

    return next();
  });
}

app.use("/userapi", checkToken, userRoutes);
app.use("/groupapi", checkToken, groupRoutes);
app.use("/mapusergroup", checkToken, userGroupRoutes);

app.use(errorHandle);

function errorHandle(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(err);
  if (res.headersSent) {
    next(err);
  }
  res.status(500).send("Internal Server Error");
}

process.on("unhandledRejection", err => {
  logger.error(err);
});
process.on("uncaughtException", err => {
  logger.error(err.message + " ErrorStack: " + err.stack);
  process.exit(1);
});

export default app;
