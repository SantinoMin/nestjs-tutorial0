import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
// import { User } from './interface/user.interface';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  // createMany([user1, user2]) {
  //   throw new Error('Method not implemented.');
  // }
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  private readonly users = [
    {
      user_idx: 1,
      username: 'sangmin',
      password: '123',
      salt: 'salt',
    },
    {
      user_idx: 2,
      username: 'maria',
      password: 'guess',
      salt: 'salt',
    },
  ];

  // user.username은 users 배열[]안에 있는 'santino'가 될것임(예시)
  // 그리고 === username의 username은 body에 넣는 값일걸로 보임
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  // // find()메소드 =
  async findAll(): Promise<User[]> {
    return await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .getMany();
  }

  async findIdx(user_idx: number): Promise<User> {
    return await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.user_idx = :user_idx', { user_idx: user_idx })
      .getOne();
  }

  // findOne(id: number): Promise<User> {
  //   return this.usersRepository.findOneBy({ id });
  // }

  // async remove(id: string): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }

  // async createMany(users: User[]) {
  //   const queryRunner = this.dataSource.createQueryRunner();

  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();

  //   try {
  //     await queryRunner.manager.save(users[0]);
  //     await queryRunner.manager.save(users[1]);

  //     await queryRunner.commitTransaction();
  //   } catch (err) {
  //     // since we have errors lets rollback the changes we made
  //     await queryRunner.rollbackTransaction();
  //   } finally {
  //     // you need to release a queryRunner which was manually instantiated
  //     await queryRunner.release();
  //   }
  // }
  // }

  // private readonly users: User[] = [];

  //saltround = 10 <= 10번 시도 가능

  signup(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const user = new User();
    user.username = username;
    user.password = hash;
    user.salt = salt;

    //단방향 hash보다 중요한게 있다 user가 signin까지 바로 되는걸 원한다면ㄴ..이렇게 개발 => 1) 회원가입 후 바로 로그인이 되도록 할지 2) 또는 회원가입 후 한번 더 로그인 정보를 입력해서, 아이디 비번을 기억하도록 할지
    //쿼리빌더 왜 쓰는지?

    //무슨 생각으로 이렇게 짰는지랑, 어떤 방향으로 짰는지.

    // this.usersRepository.save(user);

    // const userInfo = this.usersRepository.find({ where: { username } });
    // return안 해도 됨
    // return지우면 save쪽은 통신쪽이라 통신을 어떻게 할지 지정해야됨
    return this.usersRepository.save(user);
  }

  // 동기 비동기
  // await는 동기방식일 때 작성
  // 동기 비동기식 공부

  //회원가입 후 바로 로그인 되도록?

  async signin(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;
    const userResult = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username', {
        username: username,
      })
      // .andWhere('user.password = :password', { password: password })
      .getOne();
    const { salt } = userResult;
    console.log(userResult);
    const hash = bcrypt.hashSync(password, salt);
    const signInResult = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username', {
        username: username,
      })
      .andWhere('user.password = :password', { password: hash })
      .getOne();
    return signInResult;
  }

  // let authCheck = false;
  // this.users.forEach((item) => {
  //   const hash = bcrypt.hashSync(password, item.salt);

  //   if (item.username == username && item.password == password) {
  //     authCheck = true;
  //   }
  // });
  // return authCheck;

  // findAll(): User[] {
  //   return this.users;
  // }

  async updateUser(updateUserDto: UpdateUserDto): Promise<any> {
    const { user_idx, username, password } = updateUserDto;

    const userResult = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.user_idx = :user_idx', { user_idx: user_idx })
      // .andwhere("user.password = :password", {password : password})
      .getOne();
    const { salt } = userResult;
    console.log(userResult);
    const hash = bcrypt.hashSync(password, salt);

    return this.dataSource
      .createQueryBuilder()
      .update(User)
      .set({ username: username, password: hash })
      .where('user_idx = :user_idx', { user_idx: user_idx })
      .execute();
  }

  async remove(user_idx: number): Promise<DeleteResult> {
    return await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('user_idx = :user_idx', { user_idx: user_idx })
      .execute();
  }
}
