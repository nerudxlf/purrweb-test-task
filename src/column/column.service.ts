import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ColumnModel } from './column.model';
import { ColumnDto } from './dto/column.dto';

@Injectable()
export class ColumnService {
    constructor(@InjectModel(ColumnModel) private columnRepository: typeof ColumnModel){}
    
    async createColumn(dto: ColumnDto, user_id: any){
        const obj = {
            c_name: dto.c_name,
            c_description: dto.c_description,
            c_user_id: user_id,
        }
        //const column = await this.columnRepository.create({...dto, c_user_id: user_id}) ERROR
        const column = await this.columnRepository.create(obj);
        return column;
    }

    async deleteColumn(id: number){
        const result = await this.columnRepository.destroy({where: {column_id: id}});
        return result;
    }

    async getAll(user_id: number){
        const result = await this.columnRepository.findAll({where: {c_user_id: user_id}});
        return result;
    }

    async getCurrentColumn(id: number){
        const result = await this.columnRepository.findOne({where: {column_id: id}});
        return result;
    }

    async updateColumn(dto: ColumnDto, id: number){
        const result = await this.columnRepository.update(dto, {where: {column_id: id}});
        return result;
    }
}
