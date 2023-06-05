import { Router, Request, Response } from "express";
import { CreateTagDto } from "../dtos/create-tag.dto";
import { TagBlogDto } from "../dtos/tag-blog.dto";
import AuthenticationMiddleware from "../middlewares/authentication.middleware";
import { IsAdmin } from "../middlewares/authorize.middleware";
import ValidationMiddleware from "../middlewares/validation.middleware";
import * as TagService from "../services/tag.service";
import { UpdateTagDto } from "../dtos/update-tag.dto";

const router = Router();

router.post(
  "/",
  AuthenticationMiddleware,
  IsAdmin,
  ValidationMiddleware(CreateTagDto),
  (req: Request, res: Response) => TagService.createTag(req, res)
);
router.get(
  "/",
  AuthenticationMiddleware,
  IsAdmin,
  (req: Request, res: Response) => TagService.findTags(req, res)
);
router.patch(
  "/:id",
  AuthenticationMiddleware,
  IsAdmin,
  ValidationMiddleware(UpdateTagDto),
  (req: Request, res: Response) => TagService.updateTag(req, res)
);
router.delete(
  "/:id",
  AuthenticationMiddleware,
  IsAdmin,
  (req: Request, res: Response) => TagService.deleteTag(req, res)
);
router.patch(
  "/tag-blog",
  AuthenticationMiddleware,
  IsAdmin,
  ValidationMiddleware(TagBlogDto),
  (req: Request, res: Response) => TagService.addTagToBlog(req, res)
);

export default router;
