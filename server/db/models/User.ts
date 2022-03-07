import {
  Model,
  Column,
  Table,
  AllowNull,
  DataType,
  Default,
  Length,
  HasMany,
  PrimaryKey
} from "sequelize-typescript";
import Integration from "./Integration";
import Event from "./Event";

@Table({
  timestamps: true,
  tableName: "User"
})
class User extends Model<User> {
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUIDV4)
  id!: number;

  @Length({ min: 2, max: 20 })
  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @Length({ min: 2, max: 20 })
  @AllowNull(false)
  @Column(DataType.STRING)
  secondName!: string;

  @Length({ min: 2 })
  @AllowNull(false)
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  password!: string;

  @HasMany(() => Event)
  events!: Event[];

  @HasMany(() => Integration)
  integrations!: Integration[];
}

export default User;
