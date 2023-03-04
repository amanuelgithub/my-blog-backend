import { Router } from "express";
import authRoute from "./auth.route";
import userRoutes from "./user.route";

const router = Router();

router.use("/auth", authRoute);
router.use("/users", userRoutes);

export default router;
