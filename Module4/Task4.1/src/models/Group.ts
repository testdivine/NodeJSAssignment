import {
    Model,
    Column,
    Table,
    PrimaryKey,
    DataType,
    CreatedAt,
    UpdatedAt,
} from 'sequelize-typescript';
type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

@Table
export class Group extends Model<Group>{
    @PrimaryKey
    @Column(DataType.STRING)
    groupid!: string;

    @Column(DataType.STRING)
    name!: string;

    @Column(DataType.STRING)
    permissions: Permission[];

    @CreatedAt
    @Column(DataType.DATE)
    createdat!: Date;

    @UpdatedAt
    @Column(DataType.DATE)
    updatedat!: Date;
}