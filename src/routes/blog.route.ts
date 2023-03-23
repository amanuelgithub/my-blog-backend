import { Router, Request, Response } from "express";
import { CreateBlogDto } from "../dtos/create-blog.dto";
import { PublishBlogDto } from "../dtos/publish-blog.dto";
import AuthenticationMiddleware from "../middlewares/authentication.middleware";
import { IsAdmin } from "../middlewares/authorize.middleware";
import ValidationMiddleware from "../middlewares/validation.middleware";
import * as BlogService from "../services/blog.service";

const router = Router();

router.post(
  "/",
  AuthenticationMiddleware,
  IsAdmin,
  (req: Request, res: Response) => BlogService.findBlogs(req, res)
);
router.post(
  "/",
  AuthenticationMiddleware,
  IsAdmin,
  ValidationMiddleware(CreateBlogDto),
  (req: Request, res: Response) => BlogService.createBlog(req, res)
);
router.patch(
  "/:blogId/publish",
  AuthenticationMiddleware,
  IsAdmin,
  ValidationMiddleware(PublishBlogDto),
  (req: Request, res: Response) => BlogService.publishBlog(req, res)
);

export default router;
