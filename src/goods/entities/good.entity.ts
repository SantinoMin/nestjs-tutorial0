import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Good {
  @PrimaryGeneratedColumn()
  goods_idx: number;

  @Column()
  goods_name: string;

  @Column()
  price: number;
}
