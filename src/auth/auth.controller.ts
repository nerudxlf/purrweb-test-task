import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService, private readonly authService: AuthService){}
    
    @UsePipes(new ValidationPipe())
    @Post('register')
    async register(@Body() dto: AuthDto){
        const oldUser = await this.userService.findUserByEmail(dto.email);
        if (oldUser){
            throw new BadRequestException('Пользователь уже авторизирован')
        }
        return this.authService.createUser(dto);
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('login')
    async login(@Body() dto: AuthDto){
        const user = await this.authService.validateUser(dto);
        return await this.authService.generateToken(user); 
    }
}
