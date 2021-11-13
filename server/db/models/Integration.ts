import {
  Model,
  Column,
  Table,
  AllowNull,
  DataType,
  Default,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
} from "sequelize-typescript";
import { Services } from "../../constants/services";
import User from "./User";

@Table({
  timestamps: true,
  tableName: `Integration`,
})
class Integration extends Model<Integration> {
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUIDV4)
  id!: number;

  @AllowNull(false)
  @Column(DataType.ENUM(Services.googleCalendar, Services.microsoftCalendar))
  type!: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  user_id!: string;

  @BelongsTo(() => User)
  user!: User;

  @AllowNull(false)
  @Column(DataType.STRING)
  access_token!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  refresh_token!: string;

  @Column(DataType.STRING)
  calendar_id!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  timezone!: string;
}

export default Integration;
