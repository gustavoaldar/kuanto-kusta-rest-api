import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';

export class ProductController {
    async findAll(request: Request, response: Response) {
        try {
            const productService = new ProductService();
            const products = await productService.findAll();
            return response.json(products);
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}