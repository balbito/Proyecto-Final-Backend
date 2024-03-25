export default class UsersRepository {
    constructor(dao) {
      this.dao = dao;
    }
    getAll = () => {
      return this.dao.getAllUsers();
    };
  
    getOne = (userId) => {
      return this.dao.getUser(userId);
    };
    delete = (userId) => {
      return this.dao.deleteUser(userId);
    };
    changeRole = (userId) => {
      return this.dao.changeRole(userId);
    }
    getUserByEmail = (email) => {
      return this.dao.getUserByEmail(email);
    }
  }