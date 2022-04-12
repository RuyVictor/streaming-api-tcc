import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Category } from "./Category";
import { User } from "./User";

export enum StreamStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

@Entity("streams")
export class Stream {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: "enum", enum: StreamStatus, default: StreamStatus.INACTIVE })
  status: StreamStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => User, (User) => User.stream)
  @JoinColumn()
  user: User;

  @OneToOne(() => Category, (Category) => Category.stream)
  @JoinColumn()
  category: Category;
}
