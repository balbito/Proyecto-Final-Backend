import stripe from 'stripe';
import config from '../config/config.js';
const stripeInstance = stripe(config.stripeSecretKey)
import { cartService } from "../services/service.js";

export const checkoutController = async (req, res) => {
    console.log("entre al controller checkout")
    const { cid } = req.params;
      let result = 0;
      const calculateOrderAmount = async (cid) => {
        console.log(cid)
        const cart = await cartService.getOne(cid)
        console.log(cart)
        if (!cart) {
          return -1;
        }
        if (cart.products.length === 0) {
          return -1;
        }
        
        let totalPrice = 0;
    
        // Recorremos los productos del carrito y sumamos el precio total
        for (let i = 0; i < cart.products.length; i++) {
          const product = cart.products[i].productId;
          const quantity = cart.products[i].quantity;

    
          // Sumamos el precio total, teniendo en cuenta la cantidad de cada producto
          totalPrice += product.price * quantity;
        }
        result = totalPrice;
        return result;
      };
       console.log(result)
      try {
        let amount = await calculateOrderAmount(cid);
        const { items } = req.body;
        const paymentIntent = await stripeInstance.paymentIntents.create({
          amount: amount,
          currency: "usd",
          automatic_payment_methods: {
            enabled: true,
          },
        });
    
        res.send({
          clientSecret: paymentIntent.client_secret,
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}