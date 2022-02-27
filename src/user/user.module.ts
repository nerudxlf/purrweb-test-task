import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user.controller';
import { UserModel } from './user.model';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [
    UserController,
  ],
  imports: [
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([UserModel]),
  ],
  providers: [
    UserService,
  ],
  exports: [
    UserService,
  ]
})
export class UserModule {}
