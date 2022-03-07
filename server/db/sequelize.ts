import { Sequelize } from "sequelize-typescript";
import Event from "./models/Event";
import Integration from "./models/Integration";
import User from "./models/User";

const sequelize = new Sequelize({
  dialect: "postgres",
  database: "schedule-task",
  username: "postgres",
  password: "starwars",
  models: [__dirname + "/models/*.ts"]
});

export default sequelize;

export { Event, Integration, User };
