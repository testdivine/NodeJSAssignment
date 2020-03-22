import {
    Table,
    Model,
    ForeignKey,
    Column,
    DataType
} from 'sequelize-typescript';
import { Users } from './Users';
import { Group } from './Group';

@Table
export class UserGroup extends Model<UserGroup>{
    @ForeignKey(() => Users)
    @Column(DataType.STRING)
    userid: string;

    @ForeignKey(() => Group)
    @Column(DataType.STRING)
    groupid: string;
}