import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_idx: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // @Column()
  // firstName: string;

  // @Column()
  // lastName: string;

  @Column()
  salt: string;
}
