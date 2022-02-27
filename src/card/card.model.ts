import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ColumnModel } from "src/column/column.model";
import { CommentModel } from "src/comment/comment.model";


interface CardCreate{
    name: string
}


@Table({tableName: 'cards'})
export class CardModel extends Model<CardModel, CardCreate>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    card_id: number;

    @ApiProperty({example: 'Name', description: 'Column name'})
    @Column({type: DataType.STRING, allowNull: false})
    c_name: string;

    @ApiProperty({example: 'Text', description: 'Card descriptrion'})
    @Column({type: DataType.TEXT})
    c_description: string;

    @ApiProperty({example: 'Result', description: 'Card result'})
    @Column({type: DataType.TEXT})
    c_result: string;

    @BelongsTo(() => ColumnModel)
    columns: ColumnModel;

    @ForeignKey(() => ColumnModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    c_column_id: number;

    @HasMany(() => CommentModel)
    cardComment: CommentModel[];
}