import axios from 'axios';
import 'dotenv/config';

interface ICartFind {
    userId: string;
}

interface ICartChange {
    userId: string;
    productId: string;
}

export class CartService {

    async find({ userId }: ICartFind) {
        // Get Cart
        const response = await axios.get(`${process.env.MS_CART}/cart/${userId}`);
        const { cart, items = [] } = response.data;

        // Get Products
        const res = await axios.get(`${process.env.MS_PRODUCT}/product`);
        const products = res.data;

        const myitems = [];
        for (let i = 0; i < items.length; i++) {
            if (!myitems.includes(myitems.find((el: any) => el.productId === items[i].productId))) {
                myitems.push({
                    productId: items[i].productId,
                    quantity: items.filter((item: any) => item.productId === items[i].productId).length,
                    price: products.filter((item: any) => item._id === items[i].productId)[0].price
                })
            }
        }

        let totalPrice = 0;
        let totalQuantity = 0;
        for (const item of myitems) {
            totalPrice += item.price * item.quantity;
            totalQuantity += item.quantity;
        }

        return {
            shoppingCartId: cart.shoppingCartId,
            userId: cart.userId,
            totalPrice,
            totalQuantity,
            products: myitems
        }
    }
    async add({ userId, productId }: ICartChange) {
        const response = await axios.get(`${process.env.MS_PRODUCT}/product/${productId}`);
        const product = response.data;
        if (product._id !== undefined) {
            await axios
                .post(`${process.env.MS_CART}/cart`, { userId, productId })
                .catch((error) => {
                    throw new Error(`${error.response.data.message}`);
                })
        } else {
            throw new Error("Product not found");
        }
    }
    async remove({ userId, productId }: ICartChange) {
        await axios.put(`${process.env.MS_CART}/cart`, { userId, productId })
    }
}