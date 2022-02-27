import { Controller, Get, Delete, Patch, Param, Body, UseGuards, BadRequestException, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@ApiTags("Users")
@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @ApiOperation({summary: "Получение пользователя"})
    @ApiResponse({status: 200, type: UserModel})
    @UseGuards(JwtAuthGuard, AccessGuard)
    @Get(':id')
    async get(@Param('id') id: number){
        const user = await this.userService.findUserById(id);
        if ( !user ){
            throw new BadRequestException('Пользователь не существует');
        }
        return user;
    }

    @UseGuards(JwtAuthGuard, AccessGuard)
    @Delete('')
    async delete(@UserId() userId: number){
        const result = await this.userService.deleteUser(userId);
        return result;
    }

    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard, AccessGuard)
    @Patch('')
    async path(@UserId() userId, @Body() dto: UserModel){
        const user = await this.userService.updateUser(dto, userId);
        return user;
    }
}
