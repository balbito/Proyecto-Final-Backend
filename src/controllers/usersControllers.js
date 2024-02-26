import { usersService } from "../services/service.js";

export const getUsersController = async (req, res) => {
  try {
    const users = await usersService.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserController = async (req, res) => {
  try {
    let userId = req.params.userId;
    const user = await usersService.getOne(userId);
    if (!user) {
      res.status(202).json({ message: "User not found with ID: " + userId });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    let userId = req.params.userId;
    const user = await usersService.delete(userId);
    if (!user) {
      res.status(202).json({ message: "User not found with ID: " + userId });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};