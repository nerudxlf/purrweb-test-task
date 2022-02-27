import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { throwIfEmpty } from 'rxjs';
import { UserDto } from './dto/user.dto';
import { UserModel } from './user.model';

@Injectable()
export class UserService {

    constructor(@InjectModel(UserModel) private userRepository: typeof UserModel){}

    async findUserByEmail(email: string){
        const user = await this.userRepository.findOne({where: {u_email: email}});
        return user;
    }

    async findUserById(id: number){
        const user = await this.userRepository.findOne({where: {user_id: id}});
        return user;
    }

    async createUser(email: string, password: string){
        const user = await this.userRepository.create({u_email: email, u_password: password});
        return user;
    }

    async deleteUser(id: number){
        const result = await this.userRepository.destroy({where: {user_id: id}});
        return result;
    }

    async updateUser(dto: UserDto, id: number){
        const user = await this.userRepository.update(dto, {where: {user_id: id}});
        return user;
    }
}
