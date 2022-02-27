import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { CardModel } from './card.model';
import { CardDto } from './dto/card.dto';

@Injectable()
export class CardService {
    constructor(@InjectModel(CardModel) private cardRepository: typeof CardModel){}

    async createCard(dto: CardDto, columnId: number){
        const obj = {
            c_name: dto.c_name,
            c_description: dto.c_description,
            c_result: dto.c_result,
            c_column_id: columnId,
        }
        const card = await this.cardRepository.create(obj);
        return card;
    }

    async deleteCard(id: number){
        console.log(id);
        const result = await this.cardRepository.destroy({where: {card_id: id}});
        return result;
    }

    async getCurrentCard(id: number){
        const result = await  this.cardRepository.findOne({where: {card_id: id}});
        return result;
    }

    async getAllCard(id: number){
        const result = await this.cardRepository.findAll({where: {c_column_id: id}});
        return result;
    }

    async updateCard(dto: CardDto, id: number){
        const result = await this.cardRepository.update(dto, {where: {card_id: id}});
        return result;
    }
}
