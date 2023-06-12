import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';
// import { UserSubscriber } from './users.subsciber';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule,
    //
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    //
  ],
  // exports: [TypeOrmModule],
  controllers: [UsersController],
  exports: [TypeOrmModule],
  providers: [UsersService],
})
export class UsersModule {}
