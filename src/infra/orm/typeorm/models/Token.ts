import { Token } from '@/domain/token.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('token_blacklist')
export class TokenModel implements Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: null })
  hash: string;

  @CreateDateColumn()
  created_at: Date;
}
