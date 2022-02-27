import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { UserModel } from 'src/user/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private readonly jwtService: JwtService,
        ){ }
    
    async createUser({ email, password }: AuthDto){
        const salt = genSaltSync(7);
        const hashedPassword = hashSync(password, salt);
        const newUser = await this.userService.createUser(email, hashedPassword);
        return this.generateToken(newUser);
    }

    async generateToken(user: UserModel){
        const payload = {id: user.user_id};
        return {
            token: this.jwtService.sign(payload),
        }
    }

    async validateUser({ email, password }: AuthDto){
        const user = await this.userService.findUserByEmail(email);
        if (!user){
            throw new UnauthorizedException('Пользователь не найден');
        }
        const isCorrectPassword = compareSync(password, user.u_password);
        if (!isCorrectPassword){
            throw new UnauthorizedException('Пароль или email указаны с ошибкой');  
        }
        return user;
    }
    
}
