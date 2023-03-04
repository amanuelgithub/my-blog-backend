import { Request, Response } from "express";
import * as userService from "../services/user.service";

export async function findAllUsers(req: Request, res: Response) {
  const users = await userService.findAll(req, res);

  return users;
}

export async function createUser(req: Request, res: Response) {
  const users = await userService.createUser(req, res);

  return users;
}
