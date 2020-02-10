import express from "express";
import { Sequelize } from "sequelize-typescript";
import { Users } from "./models/Users";
import userRoutes from "./routes/user-route";
const app = express();

const sequelize = new Sequelize("TestDB", "postgres", "adminadmin", {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  models: [__dirname + "/models"]
});

Users.sync();

app.use(express.json());
app.use('/userapi', userRoutes);

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
