import userModel from "../models/users.model.js";
import logger from "../utils/logger.js";

export default class UserService {
  async getAllUsers() {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      logger.error("Error consulting users");
    }
  }

  async getUser(userId) {
    try {
      const user = await userModel.findById(userId);
      if (!user) {
        return { message: "User not found with ID: " + userId };
      }
      return user;
    } catch (error) {
      logger.error("Error consulting user with ID: " + userId);
    }
  }

  async deleteUser(userId) {
    try {
      const user = await userModel.findByIdAndDelete(userId);
      if (!user) {
        return { message: "User not found with ID: " + userId };
      }
      return { message: "User deleted" };
    } catch (error) {
      logger.error("Error deleting user with ID: " + userId);
    }
  }

  async changeRole(userId) {
    try {
      const user = await userModel.findById(userId)
      if(!user) {
        throw new Error ("No existe el usuario")
      }
      user.role == "user" ? user.role = "premium" : user.role = "user";
      console.log(user)
      user.save();
      return true
    } catch (error) {
      return ("Se ha producido un error" + error)
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await userModel.findOne({email: email});
      return (user)
    } catch (error) {
      logger.error("Error found the user: " + error);
    }
  }
}

