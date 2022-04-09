import { AppDataSource } from '../database';
import { User } from '../models/User';

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export class AuthService {
    static async signIn(email: string, password: string) {
        const userRepository = AppDataSource.getRepository(User)

        const user = await userRepository
		.createQueryBuilder('user')
		.where("user.email = :email", {email: email})
		.addSelect('user.password')
		.getOne()

		if (!user) {
			throw new Error('User not Found');
		}

		const passwordMathed = await compare(password, user.password);

		if (!passwordMathed) {
			throw new Error('Incorrect email/password combination.');
		}

		const token = sign({}, process.env.JWT_SECRET, {
			subject: user.id,
			expiresIn: "7d",
		});

		return {
			user,
			token,
		};
    }
}