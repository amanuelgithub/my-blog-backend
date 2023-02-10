import { Request, Response } from "express";
import AppDataSource from "../config/app-data-source";
import { User } from "../entity/user.entity";

export async function findAll(req: Request, res: Response) {
  try {
    const users = await AppDataSource.getRepository(User).find();

    if (users.length === 0) {
      res.send("users not found!");
    }

    return users;
  } catch (error: any) {
    res.send(error.message);
  }
}
