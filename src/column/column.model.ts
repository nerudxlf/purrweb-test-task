import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { UserModel } from "src/user/user.model";
import { CardModel } from "src/card/card.model";


interface ColumnCreate{
    name: string;
    description: string;
    user_id: number;
}


@Table({tableName: 'columns'})
export class ColumnModel extends Model<ColumnModel, ColumnCreate>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    column_id: number;

    @ApiProperty({example: 'Name', description: 'Column name'})
    @Column({type: DataType.STRING, allowNull: false})
    c_name: string;

    @ApiProperty({example: 'Text', description: 'Column description'})
    @Column({type: DataType.TEXT})
    c_description: string;

    @BelongsTo(() => UserModel)
    user: UserModel;

    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    c_user_id: number;

    @HasMany(() => CardModel)
    columnsCard: CardModel[];
}
