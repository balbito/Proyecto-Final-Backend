import { Router } from "express";
import {
    getUsersController,
  getUserController,
  deleteUserController,
} from "../../controllers/usersControllers.js";

const router = Router();

router.get("/", getUsersController);

router.get("/:userId", getUserController);

router.delete("/:userId", deleteUserController);

export default router;