import { Router } from "express";
import {
  getAllTicketsController,
  getTicketController,
  deleteTicketController,
} from "../../controllers/ticketsControllers.js";
import { authorization } from "../../utils/auth.js";
import { passportCall } from "../../utils/passport.js";

const router = Router();

router.get(
  "/",
  passportCall("jwt"),
  authorization("admin"),
  getAllTicketsController
);
router.get(
  "/:ticketId",
  passportCall("jwt"),
  authorization("admin"),
  getTicketController
);
router.delete(
  "/:ticketId",
  passportCall("jwt"),
  authorization("admin"),
  deleteTicketController
);

export default router;