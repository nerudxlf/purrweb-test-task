import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "src/user/user.model";
import { CardModel } from "src/card/card.model";

interface CommentCreate{
    text: string;

    cardId: number,
}

@Table({tableName: 'comments'})
export class CommentModel extends Model<CommentModel, CommentCreate>{
    @ApiProperty({example: 1, description: 'Comment Id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    comment_id: number;

    @ApiProperty({example: 'Text', description: 'Comments'})
    @Column({type: DataType.STRING, allowNull: false})
    c_text: string;

    @BelongsTo(() => UserModel)
    user: UserModel;

    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    c_user_id: number;

    @BelongsTo(() => CardModel)
    card: CardModel

    @ForeignKey(() => CardModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    c_card_id: number;
}
