import { Schema, model } from 'mongoose';

const cartSchema = new Schema({

    products: [{

        productId: { type: Schema.Types.ObjectId, ref: "products", required: true },

        quantity: { type: Number, required: true},

    }],

});

cartSchema.pre("find", function () {
    this.populate("products.productId");
});

cartSchema.pre("findOne", function () {
    this.populate("products.productId");
  });

const cartModel = model("carts", cartSchema);

export { cartModel };