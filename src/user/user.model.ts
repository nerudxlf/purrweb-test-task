import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ColumnModel } from "src/column/column.model";
import { CommentModel } from "src/comment/comment.model";

interface UserCreate{
    u_email: string;
    u_password: string;
}

@Table({tableName: 'users'})
export class UserModel extends Model<UserModel, UserCreate>{
    @ApiProperty({example: 1, description: 'User Id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    user_id: number;

    @ApiProperty({example: 'user@email.com', description: 'User email'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    u_email: string;

    @ApiProperty({example: 'T1zx2$fa0Vm#', description: 'User password'})
    @Column({type: DataType.STRING, allowNull: false})
    u_password: string;

    @HasMany(() => ColumnModel)
    userColumns: ColumnModel[];

    @HasMany(() => CommentModel)
    userComment: CommentModel[];

}
