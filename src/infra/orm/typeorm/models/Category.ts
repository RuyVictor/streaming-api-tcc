import { Category } from '@/domain/category.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Tree,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { StreamModel } from './Stream';

@Entity('categories')
@Tree('adjacency-list')
export class CategoryModel implements Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => CategoryModel, (CategoryModel) => CategoryModel.children)
  parent: CategoryModel;

  @OneToMany(() => CategoryModel, (CategoryModel) => CategoryModel.parent)
  children: CategoryModel[];

  @OneToMany(() => StreamModel, (StreamModel) => StreamModel.category)
  streams: StreamModel[];
}
