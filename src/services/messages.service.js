import { messageModel } from "../models/messages.model.js";

export default class messageService {
  async getAllMessages() {
    return await messageModel.find();
  }
  async createMessage(message) {
    return await messageModel.create(message);
  }
}