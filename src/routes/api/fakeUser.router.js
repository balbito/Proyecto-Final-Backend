import { Router } from "express";
import { fakeUser } from "../../utils/fakeUsers.js";

const router = Router();

router.get("/", fakeUser);

export default router;