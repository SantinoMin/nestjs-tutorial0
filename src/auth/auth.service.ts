import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  //result는 뭐임?
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async tokenValidateUser(payload: Payload): Promise<User | undefined> {
    return await this.usersService.findByFields({
      where: { id: payload.id },
    });
  }

  // async login(user: any) {
  // const payload = { username: user.username, sub: user.user_idx };
  // return {
  //   access_token: this.jwtService.sign(payload),
  //   };
  // }

  async login(user: any) {
    // const user = await this.userService.findOne(loginUser.username);
    // if (user) {
    const payload = { username: user.username, sub: user.user_idx };
    console.log(process.env.JWT_SECRET_KEY);
    return {
      access_token: this.jwtService.sign(payload),
    };
    // else {
    //   throw new UnauthorizedException({
    //     error: 'There is no user',
    //   });
  }
}
