import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Tree,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Stream } from './Stream';

@Entity()
@Tree('adjacency-list')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => Category, (category) => category.children)
  parent: Category;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];

  @OneToMany(() => Stream, (Stream) => Stream.category)
  streams: Stream[];
}
