import { Request, Response } from "express";
import { findAll } from "../services/user.service";

export async function findAllUsers(req: Request, res: Response) {
  const users = await findAll(req, res);

  return users;
}
