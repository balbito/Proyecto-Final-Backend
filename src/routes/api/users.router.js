import { Router } from "express";
import {
  getUsersController,
  getUserController,
  deleteUserController,
  resetPasswordController,
  changePassword,
  deleteInactiveUsers,
  changeRole,
} from "../../controllers/usersControllers.js";
import { authorization } from "../../utils/auth.js";
import { passportCall } from "../../utils/passport.js";


const router = Router();

router.get(
  "/",
  passportCall("jwt"),
  authorization(["admin"]),
  getUsersController
);

router.get(
  "/:userId",
  passportCall("jwt"),
  authorization(["admin"]),
  getUserController
);

router.delete(
  "/:userId",
  passportCall("jwt"),
  authorization(["admin"]),
  deleteUserController
);

router.put("/changeRole/:uid",
passportCall("jwt"),
authorization(["admin"]),
changeRole
);

router.post("/resetPassword",
 resetPasswordController
)

router.post("/changePassword",
  changePassword
)

router.delete('/delete/inactiveUsers', 
  passportCall("jwt"),
  authorization(["admin"]),
  deleteInactiveUsers
)
export default router;