import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY,
      signOptions: {
        expiresIn: '24h',
      },
    }),
    PassportModule,
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
    JwtStrategy,
  ],
  exports:[
    JwtModule,
  ]
})
export class AuthModule {}
