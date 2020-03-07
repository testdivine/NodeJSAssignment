import { Sequelize } from "sequelize-typescript";

const sequelizeManager = new Sequelize("TestDB", "postgres", "adminadmin", {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  models: [__dirname + "/models"]
});

export default sequelizeManager;