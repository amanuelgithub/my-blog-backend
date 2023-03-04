import { Request, Response } from "express";
import httpStatus from "http-status";
import AppDataSource from "../config/app-data-source";
import { User } from "../entities/user.entity";

const userRepository = AppDataSource.getRepository(User);

export async function findAll(req: Request, res: Response) {
  const users = await userRepository.find();

  if (users.length === 0) {
    res.send("users not found!");
  }

  return users;
}

export async function createUser(req: Request, res: Response) {
  const user = userRepository.create(req.body);

  if (!user) {
    res.send("some problem");
  }

  await userRepository.save(user);
  res.send(httpStatus[200]);
}
