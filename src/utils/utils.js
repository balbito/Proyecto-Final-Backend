import { fileURLToPath } from "url";
import { dirname } from "path";
import { cartModel } from "../models/carts.model.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const basePath = dirname(__dirname);

export async function createCart(cart) {
    let newCart = await cartModel.create(cart)
    return newCart._id
}

export default basePath;