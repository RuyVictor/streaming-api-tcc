import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Tree,
  TreeParent,
  TreeChildren,
  OneToMany
} from "typeorm";
import { Stream } from "./Stream";

@Entity()
@Tree("nested-set")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @TreeParent()
  parent: Category;

  @TreeChildren()
  children: Category[];

  @OneToMany(() => Stream, (Stream) => Stream.category)
  streams: Stream[];
}
