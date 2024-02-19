import userDao from "../daos/dbManager/users.dao.js";

export const getUsers = async () => {
    return await userDao.getAllUsers();
  };
  
  export const getUser = async (userId) => {
    return await userDao.getUser(userId);
  };
  
  export const deleteUser = async (userId) => {
    return await userDao.deleteUser(userId);
  };