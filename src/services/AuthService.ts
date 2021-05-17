import { getCustomRepository, Repository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SECRET_API_KEY } from '../config/secret';

interface IUserLogin {
    email: string;
    password: string;
}

export class AuthService {

    async login({ email, password }: IUserLogin) {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne({ email });
        if (user) {
            const password_verify = await bcryptjs.compare(password, user.password);
            if (password_verify) {
                const token = jwt.sign({ user }, SECRET_API_KEY);
                return token;
            }
            throw new Error(`Invalid Password`);
        }
        throw new Error(`User Not Found`);
    }
}