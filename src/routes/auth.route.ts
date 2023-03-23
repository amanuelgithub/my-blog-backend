import { Request, Response, Router } from "express";
import { SignInDto } from "../dtos/signin.dto";
import AuthenticationMiddleware from "../middlewares/authentication.middleware";
import ValidationMiddleware from "../middlewares/validation.middleware";
import * as AuthService from "../services/auth.service";

const router = Router();

router.post(
  "/login",
  ValidationMiddleware(SignInDto),
  async (req: Request, res: Response) => AuthService.signin(req, res)
);
router.patch(
  "/logout",
  AuthenticationMiddleware,
  (req: Request, res: Response) => AuthService.logout(req, res)
);

// router.post(
//   "/login",
//   ValidationMiddleware(SignInDto),
//   async (req: Request, res: Response) => {
//     res.json(res.locals.input);
//   }
// );

export default router;
