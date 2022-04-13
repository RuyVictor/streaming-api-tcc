import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  Tree,
  TreeParent,
  TreeChildren
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

  @OneToOne(() => Stream, (Stream) => Stream.category)
  stream: Stream;
}
