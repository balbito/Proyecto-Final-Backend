export default class MessageRepository {
    constructor(dao) {
      this.dao = dao;
    }
    getAll = () => {
      return this.dao.getAllMessages();
    };
    create = (message) => {
      return this.dao.createMessage(message);
    };
  }