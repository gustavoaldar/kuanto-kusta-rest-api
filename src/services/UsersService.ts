import { getCustomRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepository';
import bcryptjs from 'bcryptjs';

interface IUserCreate {
    name: string;
    email: string;
    password: string;
}

export class UsersService {

    private readonly usersRepository: Repository<User>;

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository);
    }

    async create({ name, email, password }: IUserCreate) {
        if (await this.usersRepository.findOne({ email })) {
            throw new Error(`User already exists`);
        }

        const hash = await bcryptjs.hash(password, 10);

        const user = this.usersRepository.create({ name, email, password: hash });
        await this.usersRepository.save(user);

        return user;
    }
}