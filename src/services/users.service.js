import userModel from "../models/users.model.js";
import logger from "../utils/logger.js";
import userDTO from "./dto/user.dto.js";


export default class UserService {
  async getAllUsers() {
    try {
      const users = await userModel.find();
      const userDto = [];
      for(let i = 0; i < users.length; i++){
        let newDto = new userDTO(users[i])
        userDto.push(newDto)
      }
      
      return userDto;
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
      user.role = user.role === "user" ? "premium" : "user";

      await user.save();
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

  async lastConnection(email, status) {
    try {
      if(status !== "online") {

        const user = await this.getUserByEmail(email);
        user.last_connection = new Date()
        user.save()
        return user.last_connection;
      }
      const user = await this.getUserByEmail(email)
      user.last_connection = "online"
      user.save();
      return user.last_connection;
    } catch (error) {
      logger.error("Ha ocurrido un error en el lastConnection:" +  error)
    }
  }
  
  async deleteInactiveUsers() {
    try {
      const allUsers = await this.getAllUsers();
      let deletedUsers = 0;
      const now = Date.now(); // Obtener la hora actual
      const twentyFourHoursInMs = 48 * 60 * 60 * 1000; // 48 horas en milisegundos
  
      for (let i = 0; i < allUsers.length; i++) {
        const lastConnection = allUsers[i].last_connection;
        const lastConnectionDate = new Date(lastConnection);
        const timeSinceLastConnection = now - lastConnectionDate.getTime(); // Calcular el tiempo transcurrido en milisegundos
        const hoursSinceLastConnection = timeSinceLastConnection / (1000 * 60 * 60); // Convertir el tiempo transcurrido a horas
        
        if (hoursSinceLastConnection > 48) { // Si han pasado más de 48 horas
          await this.deleteUser(allUsers[i]._id); // Eliminar al usuario
          deletedUsers++;
        }
      }
  
      return deletedUsers;
    } catch (error) {
      logger.error("Error delete user last connection: " + error);
    }
  }
}

