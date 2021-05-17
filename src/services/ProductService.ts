import axios from 'axios';
import 'dotenv/config';

export class ProductService {

    async findAll() {
        const response = await axios.get(`${process.env.MS_PRODUCT}/product`);
        const { data } = response;
        const products = [];
        for (const item of data) {
            products.push({ productId: item._id, price: item.price });
        }
        return products;
    }
}