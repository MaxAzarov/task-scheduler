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
import Integration from "./Integration";
import User from "./User";

@Table({
  timestamps: true,
  tableName: `Event`,
})
class Event extends Model<Event> {
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUIDV4)
  id!: number;

  @Column(DataType.STRING)
  subject!: string;

  @Column(DataType.DATE)
  start_time!: string;

  @Column(DataType.DATE)
  end_time!: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  user_id!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Integration)
  integration_id!: number;

  @BelongsTo(() => Integration)
  integration!: Integration;

  @Column(DataType.STRING)
  body!: string;

  @Column(DataType.ENUM("accept", "decline", "pending"))
  status!: string;

  @Column(DataType.STRING)
  event_id!: string;
}

export default Event;
