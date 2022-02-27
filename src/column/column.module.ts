import { Module } from '@nestjs/common';
import { ColumnController } from './column.controller';
import { ColumnModel } from './column.model';
import { UserModel } from "../user/user.model";
import { SequelizeModule } from '@nestjs/sequelize';
import { ColumnService } from './column.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ColumnController],
  imports: [
    AuthModule,
    SequelizeModule.forFeature([ColumnModel, UserModel]),
    UserModule,
  ],
  providers: [ColumnService],
  exports: [ColumnService],
})
export class ColumnModule {}
