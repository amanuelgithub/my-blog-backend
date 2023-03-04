import { Request, Response, Router } from "express";
import { SignInDto } from "../dtos/signin.dto";
import ValidationMiddleware from "../middlewares/validation.middleware";
import * as AuthController from "../controllers/auth.controller";

const router = Router();

router.post(
  "/login",
  ValidationMiddleware(SignInDto),
  async (req: Request, res: Response) => AuthController.signin(req, res)
);

// router.post(
//   "/login",
//   ValidationMiddleware(SignInDto),
//   async (req: Request, res: Response) => {
//     res.json(res.locals.input);
//   }
// );

export default router;
