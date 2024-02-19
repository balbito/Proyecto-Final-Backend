import { messageModel } from "../../models/messages.model.js";

class MessageDao {
    async getAllMessages() {
        return await messageModel.find();
    }
    async createMessage(message) {
        return await messageModel.create(message);
    }
}

export default new MessageDao();