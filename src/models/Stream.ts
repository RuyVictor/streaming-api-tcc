import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm"
import { User } from "./User";

@Entity('streams')
export class Stream {

    @PrimaryGeneratedColumn()
    id!: string

    @Column()
    name!: string

    @Column()
    description!: string

    @Column()
    active: boolean
    
    @CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

    @OneToOne(() => User, User => User.stream)
	@JoinColumn()
	user: User;
}