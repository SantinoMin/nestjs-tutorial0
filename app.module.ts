import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { UsersModule } from 'src/users/users.module';
import { GoodsModule } from 'src/goods/goods.module';
import { CategoryModule } from './src/category/category.module';
import { Category } from 'src/category/category.entity';
import { QuestionModule } from './src/question/question.module';
import { Question } from 'src/question/question.entity';

@Module({
  imports: [
    UsersModule,
    GoodsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'nestjs-db',
      autoLoadEntities: true,
      entities: [User, Category, Question],
      synchronize: true,
    }),
    CategoryModule,
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
