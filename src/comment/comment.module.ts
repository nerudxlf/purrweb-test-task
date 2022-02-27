import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentModel } from './comment.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentService } from './comment.service';
import { CardModule } from 'src/card/card.module';
import { ColumnModule } from 'src/column/column.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CommentController],
  imports: [
    AuthModule,
    SequelizeModule.forFeature([CommentModel]),
    CardModule,
    ColumnModule,
    UserModule,
  ],
  providers: [CommentService],
})
export class CommentModule {}
