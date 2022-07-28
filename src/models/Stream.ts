import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Category } from './Category';
import { User } from './User';

export enum StreamStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('streams')
export class Stream {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'enum', enum: StreamStatus, default: StreamStatus.INACTIVE })
  status: StreamStatus;

  @Column({ default: 0 })
  spectators: number;

  @Column({ select: false })
  transmission_key: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => User, (User) => User.stream)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Category, (Category) => Category.streams)
  category: Category;
}
