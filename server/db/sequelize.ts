import { Sequelize } from "sequelize-typescript";
import User from "./models/User";
import Event from "./models/Event";
import Integration from "./models/Integration";

const sequelize = new Sequelize({
  dialect: "postgres",
  database: "schedule-task",
  username: "postgres",
  password: "starwars",
  models: [User, Event, Integration],
});

export default sequelize;
const Models = sequelize.models;

export { Models };
