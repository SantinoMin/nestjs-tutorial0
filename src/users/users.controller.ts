import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { User } from './interface/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/users.entity';
import { DeleteResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getList(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':user_idx')
  findIdx(
    @Param('user_idx', new ParseIntPipe()) user_idx: number,
  ): Promise<User> {
    console.log('id : ', user_idx);
    return this.usersService.findIdx(user_idx);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    // return req.user;
    return this.authService.login(req.user);
  }

  // @Post()
  // createMany() {
  // const user1 = new User();
  //   user1.username = 'santino';
  //   user1.password = '123';

  //   const user2 = new User();
  //   user2.username = 'sangmin';
  //   user2.password = '234';
  //   this.usersService.createMany([user1, user2]);
  // }

  @Post('signup')
  signup1(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.signup(createUserDto);
  }

  @Post('signin')
  signin2(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.signin(createUserDto);
  }

  @Patch()
  editUser(@Body() updateUserDto: UpdateUserDto): Promise<any> {
    return this.usersService.updateUser(updateUserDto);
  }

  @Delete(':user_idx')
  remove(
    @Param('user_idx', new ParseIntPipe()) user_idx: number,
  ): Promise<DeleteResult> {
    console.log('id : ', user_idx);
    return this.usersService.remove(user_idx);
  }
}
