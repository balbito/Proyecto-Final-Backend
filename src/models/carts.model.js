import { Schema, model } from 'mongoose';

const cartProductSchema = new Schema({

    products: [{

        productId: { type: Schema.Types.ObjectId, ref: "products", required: true },

        quantity: { type: Number, required: true},

    }],

});

const cartSchema = new Schema({
    userId: String,
    products: [cartProductSchema],
  });

cartSchema.pre("find", function () {
    this.populate("products.productId");
});

cartSchema.pre("findOne", function () {
    this.populate("products.productId");
  });

const cartModel = model("carts", cartSchema);

export { cartModel };