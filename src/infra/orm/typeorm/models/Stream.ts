import { Stream, StreamStatus } from '@/domain/stream.entity';
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
import { CategoryModel } from './Category';
import { UserModel } from './User';

@Entity('streams')
export class StreamModel implements Stream {
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

  @OneToOne(() => UserModel, (UserModel) => UserModel.stream)
  @JoinColumn()
  user: UserModel;

  @ManyToOne(() => CategoryModel, (CategoryModel) => CategoryModel.streams)
  category: CategoryModel;
}
