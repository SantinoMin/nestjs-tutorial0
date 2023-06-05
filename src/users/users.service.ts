import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
// import { User } from './interface/user.interface';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  //   // find()메소드 =
  //   findAll(): Promise<User[]> {
  //     return this.usersRepository.find();
  //   }

  //   findOne(id: number): Promise<User> {
  //     return this.usersRepository.findOneBy({ id });
  //   }

  //   async remove(id: string): Promise<void> {
  //     await this.usersRepository.delete(id);
  //   }

  //   async createMany(users: User[]) {
  //     const queryRunner = this.dataSource.createQueryRunner();

  //     await queryRunner.connect();
  //     await queryRunner.startTransaction();

  //     try {
  //       await queryRunner.manager.save(users[0]);
  //       await queryRunner.manager.save(users[1]);

  //       await queryRunner.commitTransaction();
  //     } catch (err) {
  //       // since we have errors lets rollback the changes we made
  //       await queryRunner.rollbackTransaction();
  //     } finally {
  //       // you need to release a queryRunner which was manually instantiated
  //       await queryRunner.release();
  //     }
  //   }
  // }

  private readonly users: User[] = [];

  signup(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const user = new User();
    user.username = username;
    user.password = hash;
    user.salt = salt;

    return this.usersRepository.save(user);
  }

  async signin(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;
    const userResult = await this.dataSource

      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :id', { username: username })
      // .andWhere('user.lastName = :lastName', { lastName: 'Saw' })
      .getOne();
    console.log(userResult);
    return userResult;
  }
}

// let authCheck = false;
// this.users.forEach((item) => {
//   const hash = bcrypt.hashSync(password, item.salt);

//   if (item.username == username && item.password == password) {
//     authCheck = true;
//   }
// });
// return authCheck;

// findId(user_idx: number): string {
//   console.log('length', this.users.length);
//   if (this.users.length > user_idx) {
//     return this.users[user_idx].username;
//   } else {
//     return 'User not found';
//   }
// }

// findAll(): User[] {
//   return this.users;
// }

// updateUser(updateUserDto: UpdateUserDto): any {
//   const { user_idx, username, password } = updateUserDto;
//   if (this.users.length > parseInt(user_idx)) {
//     const saltRounds = 10;
//     const salt = bcrypt.genSaltSync(saltRounds);
//     const hash = bcrypt.hashSync(password, salt);

//     const user: User = {
//       username: username,
//       password: hash,
//       salt: salt,
//     };
//     this.users[user_idx] = user;
//     return user;
//   } else {
//     return 'User not found';
//   }
// }
