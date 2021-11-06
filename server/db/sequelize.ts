import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  dialect: "postgres",
  database: "schedule-task",
  username: "postgres",
  password: "starwars",
  models: [__dirname + "/models/*.ts"],
});

export default sequelize;
const Models = sequelize.models;

export { Models };
