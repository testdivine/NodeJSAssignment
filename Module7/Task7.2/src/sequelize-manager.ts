import { Sequelize } from "sequelize-typescript";
import {resolve} from 'path';
import {config} from 'dotenv';
config({ path: resolve(__dirname, '../.env.db') });
const sequelizeManager = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USERNAME}`, `${process.env.DB_PASSWORD}`, {
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