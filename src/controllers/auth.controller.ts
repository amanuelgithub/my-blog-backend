import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export async function signin(req: Request, res: Response) {
  return await authService.signin(req, res);
}
