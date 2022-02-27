import { Controller, Post, Get, Delete, Param, Body, UseGuards, BadRequestException, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CardService } from 'src/card/card.service';
import { ColumnService } from 'src/column/column.service';
import { UserId } from 'src/decorators/user-id.decorator';
import { UserService } from 'src/user/user.service';
import { CommentService } from './comment.service';

@ApiTags("Comments")
@Controller('user')
export class CommentController {
    constructor(
        private commentService: CommentService,
        private columnService: ColumnService,
        private cardService: CardService,
        private userService: UserService,
    ){}

    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard, AccessGuard)
    @Post('columns/:columnId/cards/:cardId/comments')
    async create(
        @Body("text") text: string,
        @UserId() userId: number, 
        @Param('columnId') columnId: number,
        @Param('cardId') cardId: number,
    ){
        const column = await this.columnService.getCurrentColumn(columnId);
        if( !column ){
            throw new BadRequestException('Колонка не найдена');
        }
        const card = await this.cardService.getCurrentCard(cardId);
        if( !card ){
            throw new BadRequestException('Карточка не найдена')
        }
        return await this.commentService.createComment(text, userId, columnId);
    }

    @UseGuards(JwtAuthGuard, AccessGuard)
    @Get(':userId/columns/:columnId/cards/:cardId/comments')
    async get(
        @Param('userId') userId: number,
        @Param('columnId') columnId: number, 
        @Param('cardId') cardId: number,
    ){
        const user = await this.userService.findUserById(userId);
        if ( !user ){
            throw new BadRequestException('Пользователь не найден')
        }
        const column = await this.columnService.getCurrentColumn(columnId);
        if( !column ){
            throw new BadRequestException('Колонка не найдена');
        }
        const card = await this.cardService.getCurrentCard(cardId);
        if( !card ){
            throw new BadRequestException('Карточка не найдена')
        }
        return await this.commentService.getAllcomments(cardId);
    }

    @UseGuards(JwtAuthGuard, AccessGuard)
    @Delete('columns/:columnId/cards/:cardId/comments/:commentId')
    async delete(
        @Param('columnId') columnId: number, 
        @Param('cardId') cardId: number,
        @Param('commentId') commentId: number,
    ){
        const column = await this.columnService.getCurrentColumn(columnId);
        if( !column ){
            throw new BadRequestException('Колонка не найдена');
        }
        const card = await this.cardService.getCurrentCard(cardId);
        if( !card ){
            throw new BadRequestException('Карточка не найдена')
        }
        return await this.commentService.deleteComment(commentId);
    }
}
