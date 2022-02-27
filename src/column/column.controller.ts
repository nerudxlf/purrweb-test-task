import { Body, Controller, Delete, Get, Param, Post, Patch, UseGuards, BadRequestException, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import { UserService } from 'src/user/user.service';
import { ColumnService } from './column.service';
import { ColumnDto } from './dto/column.dto';


@ApiTags("Columns")
@Controller('user')
export class ColumnController {

    constructor(private columnService: ColumnService, private userService: UserService){}

    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard, AccessGuard)
    @Post('columns')
    async create(@Body() dto: ColumnDto,  @UserId() userId){
        return await this.columnService.createColumn(dto, userId)
    }

    @UseGuards(JwtAuthGuard, AccessGuard)
    @Get(':userId/columns')
    async getAllColumnByUserId(@Param('userId') userId: number){
        const isUser = await this.userService.findUserById(userId);
        if( !isUser ){
            throw new BadRequestException('Пользователь не существует');
        }
        return await this.columnService.getAll(userId);
    }

    @UseGuards(JwtAuthGuard, AccessGuard)
    @Get(':userId/columns/:columnId')
    async getOne(@Param('userId') userId: number, @Param('columnId') columnId: number){
        const isUser = await this.userService.findUserById(userId);
        if ( !isUser ){
            throw new BadRequestException('Пользователь не существует');
        } 
        return await this.columnService.getCurrentColumn(columnId);
    }

    @UseGuards(JwtAuthGuard, AccessGuard)
    @Delete('columns/:columnId')
    async deleteColumn(@Param('userId') userId: number, @Param('columnId') columnId: number){
        const isUser = await this.userService.findUserById(userId);
        if ( !isUser ){
            throw new BadRequestException('Пользователь не существует');
        } 
        return await this.columnService.deleteColumn(columnId);
    }

    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard, AccessGuard)
    @Patch('columns/:colimnId')
    async pathColumn(@Param('userId') userId: number, @Param('columnId') columnId: number, @Body() dto: ColumnDto){
        const isUser = await this.userService.findUserById(userId);
        if ( !isUser ){
            throw new BadRequestException('Пользователь не существует');
        } 
        return await this.columnService.updateColumn(dto, columnId);
    }
}
