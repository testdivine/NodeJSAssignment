import {
  Table,
  Model,
  Column,
  PrimaryKey,
  NotNull,
  DataType,
  CreatedAt,
  UpdatedAt,
  BelongsToMany
} from 'sequelize-typescript';
import { Group } from './Group';
import { UserGroup } from './UserGroup';

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

  @BelongsToMany(() => Group, () => UserGroup)
  groups: Group[];

  @CreatedAt
  @Column(DataType.DATE)
  createdat!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedat!: Date;
}
