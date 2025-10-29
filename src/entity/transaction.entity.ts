import { Column, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';

export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.uid)
  uid: string;

  // @Column()
  @OneToOne(() => Category, (category) => category.id)
  category: number;

  @Column()
  amount: number;
}
