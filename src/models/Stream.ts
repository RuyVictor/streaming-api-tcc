import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity('streams')
export class Stream {

    @PrimaryGeneratedColumn()
    id!: string

    @Column()
    name!: string

    @Column()
    description!: string

    @CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}