import { Question } from 'src/question/question.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @Column()
  // description: string;

  @ManyToOne((type) => Question, (question) => question.categories)
  question: Question[];

  // @OneToMany((type) => Category, (category) => category.parent)
  // children: Category[];
}
