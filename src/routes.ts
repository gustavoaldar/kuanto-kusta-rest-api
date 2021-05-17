import { Router } from 'express';
import { AuthController } from './controllers/AuthController';
import { CartController } from './controllers/CartController';
import { ProductController } from './controllers/ProductController';
import { UsersController } from './controllers/UsersController';
import { Auth } from './middlewares/Auth';

const usersController = new UsersController();
const authController = new AuthController();
const productController = new ProductController();
const cartController = new CartController();

const routes = Router();

// User
routes.post('/user', usersController.create);

// Auth
routes.post('/login', authController.login);

// Product
routes.get('/product', Auth, productController.findAll);

// Cart
routes.get('/cart', Auth, cartController.find);
routes.post('/cart', Auth, cartController.add);
routes.delete('/cart/:productId', Auth, cartController.remove);

export { routes };