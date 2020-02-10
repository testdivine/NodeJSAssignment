import {
  Table,
  Model,
  Column,
  PrimaryKey,
  NotNull,
  DataType,
  CreatedAt,
  UpdatedAt
} from "sequelize-typescript";

@Table
export class Users extends Model<Users> {
  @PrimaryKey
  @Column(DataType.STRING)
  userid!: string;

  @Column(DataType.STRING)
  firstname!: string;

  @Column(DataType.STRING)
  lastname!: string;

  @Column(DataType.STRING)
  email!: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdat!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedat!: Date;
}
