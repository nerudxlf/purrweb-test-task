import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CommentModel } from './comment.model';

@Injectable()
export class CommentService {
    constructor(@InjectModel(CommentModel) private commentRepository: typeof CommentModel){}

    async createComment(text: string, userId: number, cardId: number){
        const obj = {
            c_text: text,
            c_user_id: userId,
            c_card_id: cardId,
        }
        const comment = await this.commentRepository.create(obj);
        return comment;
    }

    async getAllcomments(cardId: number){
        const result = await this.commentRepository.findAll({where: {c_card_id: cardId}});
        return result;
    }

    async deleteComment(id: number){
        const result = await this.commentRepository.destroy({where: {comment_id: id}});
        return result;
    }
}
