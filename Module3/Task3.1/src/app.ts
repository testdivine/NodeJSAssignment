import express from "express";
import { Sequelize } from "sequelize-typescript";
import { Users } from "./models/Users";
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

app.post("/create", async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.sendStatus(201).send("Data inserted successfully");
  } catch (e) {
    res.sendStatus(502).send("Error in data insertion");
  }
});

app.post("/update/:id", async (req, res) => {
  try {
    await Users.update(req.body, { where: { userid: req.params.id } });
    res.sendStatus(200).send("User data updated");
  } catch (e) {
    res.sendStatus(502).send("Error in updating data");
  }
});

app.get("/getusers", async (req, res) => {
  try {
    const userlist = await Users.findAll();
    res.sendStatus(200).json(userlist);
  } catch (e) {
    res.sendStatus(502).send("Error in getting data");
  }
});

app.get("/getuser/:id", async (req, res) => {
  try {
    const user = await Users.findOne({ where: { userid: req.params.id } });
    res.sendStatus(200).json(user);
  } catch (e) {
    res.sendStatus(502).send("Error is getting data");
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    await Users.destroy({ where: { userid: req.params.id } });
    res.sendStatus(200).send("User deleted");
  } catch (e) {
    res.sendStatus(502).send("Error in deleting user");
  }
});

export default app;
