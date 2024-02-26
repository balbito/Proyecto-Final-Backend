import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
  code: {
    type: String,
    unique: true,
  },
  purchase_dateTime: String,
  amount: Number,
  purchaser: String,
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
});

const ticketModel = model("tickets", ticketSchema);

export default ticketModel;