import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { User } from './interface/user.interface';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  signup(createUserDto: CreateUserDto): User {
    const { username, password } = createUserDto;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const user: User = {
      username: username,
      password: hash,
      salt: salt,
    };
    this.users.push(user);
    return user;
  }

  signin(createUserDto: CreateUserDto): boolean {
    const { username, password } = createUserDto;
    let authCheck = false;
    this.users.forEach((item) => {
      const hash = bcrypt.hashSync(password, item.salt);

      if (item.username == username && item.password == password) {
        authCheck = true;
      }
    });
    return authCheck;
  }

  findId(user_idx: number): string {
    console.log('length', this.users.length);
    if (this.users.length > user_idx) {
      return this.users[user_idx].username;
    } else {
      return 'User not found';
    }
  }

  findAll(): User[] {
    return this.users;
  }

  updateUser(updateUserDto: UpdateUserDto): any {
    const { user_idx, username, password } = updateUserDto;
    if (this.users.length > parseInt(user_idx)) {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);

      const user: User = {
        username: username,
        password: hash,
        salt: salt,
      };
      this.users[user_idx] = user;
      return user;
    } else {
      return 'User not found';
    }
  }
}
