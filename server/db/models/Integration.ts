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
import User from "./User";

@Table({
  timestamps: true,
  tableName: `Integration`,
})
class Integration extends Model<Integration> {
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: number;

  @AllowNull(false)
  @Column(DataType.ENUM("google-calendar", "microsoft-calendar"))
  type!: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  user_id!: number;

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

  @Column(DataType.STRING)
  timezone!: string;
}

export default Integration;
