import { Body, Controller, Delete, Get, Param, Post, Patch, UseGuards, BadRequestException, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ColumnService } from 'src/column/column.service';
import { UserService } from 'src/user/user.service';
import { CardModel } from './card.model';
import { CardService } from './card.service';
import { CardDto } from './dto/card.dto';

@ApiTags("Cards")
@Controller('user')
export class CardController {
    
    constructor(private cardService: CardService, private columnService: ColumnService, private userService: UserService){}

    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard, AccessGuard)
    @Post('columns/:columnId/cards')
    async create(@Body() dto: CardDto, @Param('columnId') columnId: number){
        const column = await this.columnService.getCurrentColumn(columnId);
        if ( !column ){
            throw new BadRequestException('Колонка не найдена');
        }
        return await this.cardService.createCard(dto, columnId);
    }

    @UseGuards(JwtAuthGuard, AccessGuard)
    @Get(':userId/columns/:columnId/cards')
    async get(@Param('userId') userId: number, @Param('columnId') columnId: number){
        const user = await this.userService.findUserById(userId);
        if( !user ){
            throw new BadRequestException('Пользователь не найден');
        }
        const column = await this.columnService.getCurrentColumn(columnId);
        if( !column ){
            throw new BadRequestException('Колонка не найдена');
        }
        return await this.cardService.getAllCard(columnId);
    }

    @UseGuards(JwtAuthGuard, AccessGuard)
    @Get(':userId/columns/:columnId/cards/:cardId')
    async getCard(@Param('userId') userId: number, @Param('columnId') columnId: number, @Param('cardId') cardId: number){
        const user = await this.userService.findUserById(userId);
        if( !user ){
            throw new BadRequestException('Пользователь не найден');
        }

        const column = await this.columnService.getCurrentColumn(columnId);
        if( !column ){
            throw new BadRequestException('Колонка не найдена');
        }

        const card = await this.cardService.getCurrentCard(cardId);
        if ( !card ){
            throw new BadRequestException('Карточка не найдена');
        }

        return card;
    }

    @UseGuards(JwtAuthGuard, AccessGuard)
    @Delete('columns/:columnId/cards/:cardId')
    async delete(@Param('columnId') columnId: number, @Param('cardId') cardId: number){
        const column = await this.columnService.getCurrentColumn(columnId);
        if ( !column ){
            throw new BadRequestException('Колонка не найдена');
        }
        const card = await this.cardService.getCurrentCard(cardId);
        if ( !card ){
            throw new BadRequestException('Карточка не найдена');
        }
        return await this.cardService.deleteCard(cardId); 
    }

    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard, AccessGuard)
    @Patch('columns/:columnId/cards/:cardId')
    async path(@Param('columnId') columnId: number, @Param('cardId') cardId: number, @Body() dto: CardModel){
        const column = await this.columnService.getCurrentColumn(columnId);
        if ( !column ){
            throw new BadRequestException('Колонка не найдена');
        }
        const card = await this.cardService.getCurrentCard(cardId);
        if ( !card ){
            throw new BadRequestException('Карточка не найдена');
        }
        return await this.cardService.updateCard(dto, cardId);
    }
}
