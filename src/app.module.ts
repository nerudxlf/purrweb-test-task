import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CardModule } from './card/card.module';
import { ColumnModule } from './column/column.module';
import { CommentModule } from './comment/comment.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './user/user.model';
import { ColumnModel } from './column/column.model';
import { CardModel } from './card/card.model';
import { CommentModel } from './comment/comment.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',  
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [UserModel, ColumnModel, CardModel, CommentModel],
      autoLoadModels: true,
    }),
    AuthModule,
    UserModule, 
    CardModule, 
    ColumnModule, 
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
