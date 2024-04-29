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
    changeRole = (userId, role) => {
      return this.dao.changeRole(userId, role);
    }
    getUserByEmail = (email) => {
      return this.dao.getUserByEmail(email);
    }
    lastConnection = (email, status) => {
      return this.dao.lastConnection(email, status);
    }
    deleteInactiveUsers = () => {
      return this.dao.deleteInactiveUsers();
    }
   }