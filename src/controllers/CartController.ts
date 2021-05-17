import { Request, Response } from 'express';
import { CartService } from '../services/CartService';

export class CartController {
    async find(request: Request, response: Response) {
        try {
            const { user } = request.body.auth;
            const cartService = new CartService();
            const cart = await cartService.find({ userId: user.userId });
            return response.json(cart);
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
    async add(request: Request, response: Response) {
        const requiredFields = ['productId'];
        for (const field of requiredFields) {
            if (!request.body[field]) {
                return response.status(400).send({ error: `Missing Param: ${field}` });
            }
        }
        const { productId } = request.body;
        try {
            const { user } = request.body.auth;
            const cartService = new CartService();
            const cart = await cartService.add({ userId: user.userId, productId });
            return response.json(cart);
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
    async remove(request: Request, response: Response) {
        try {
            const { user } = request.body.auth;
            const { productId } = request.params;
            const cartService = new CartService();
            const cart = await cartService.remove({ userId: user.userId, productId });
            return response.json(cart);
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}