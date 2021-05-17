import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {

    async login(request: Request, response: Response) {
        const requiredFields = ['email', 'password'];
        for (const field of requiredFields) {
            if (!request.body[field]) {
                return response.status(400).send({ error: `Missing Param: ${field}` });
            }
        }

        const { email, password } = request.body;

        const authService = new AuthService();

        try {
            const token = await authService.login({ email, password });
            return response.json({ token });
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}