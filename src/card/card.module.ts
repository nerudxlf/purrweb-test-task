import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardModel } from './card.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CardService } from './card.service';
import { UserModule } from 'src/user/user.module';
import { ColumnModule } from 'src/column/column.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CardController],
  imports: [
    AuthModule,
    SequelizeModule.forFeature([CardModel]),
    UserModule,
    ColumnModule,
  ],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
