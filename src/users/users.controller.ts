import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interface/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get()
  // getList(): User[] {
  //   return this.usersService.findAll();
  // }

  // @Get(':user_idx')
  // findId(
  //   @Param('user_idx', new ParseIntPipe())
  //   user_idx: number,
  // ): string {
  //   console.log('id : ', user_idx);
  //   // get by ID logic
  //   return this.usersService.findId(user_idx);
  // }

  // @Post('signup')
  // signup1(@Body() createUserDto: CreateUserDto): User {
  //   const { username, password } = createUserDto;
  //   return this.usersService.signup(createUserDto);
  // }

  // @Post('signin')
  // signin1(@Body() createUserDto: CreateUserDto): boolean {
  //   return this.usersService.signin(createUserDto);
  // }

  // @Patch()
  // editUser(@Body() updateUserDto: UpdateUserDto): any {
  //   return this.usersService.updateUser(updateUserDto);
  // }
}
