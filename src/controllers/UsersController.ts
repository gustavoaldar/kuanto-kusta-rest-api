import { Request, Response } from 'express';
import { UsersService } from '../services/UsersService';
import axios from 'axios';
import 'dotenv/config';

export class UsersController {
    async create(request: Request, response: Response) {
        try {
            const { name, email, password } = request.body;
            const userService = new UsersService();
            const user = await userService.create({ name, email, password });
            await axios.post(`${process.env.MS_CART}/cart/${user.userId}`);
            return response.json(user);
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}