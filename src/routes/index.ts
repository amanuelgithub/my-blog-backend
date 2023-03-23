import { Router } from "express";
import authRoute from "./auth.route";
import userRoutes from "./user.route";
import blogRoutes from "./blog.route";
import tagRoutes from "./tag.route";

const router = Router();

router.use("/auth", authRoute);
router.use("/users", userRoutes);
router.use("/blog", blogRoutes);
router.use("/tags", tagRoutes);

export default router;
