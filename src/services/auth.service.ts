import { Request, Response } from "express";
import AppDataSource from "../config/app-data-source";
import { User } from "../entities/user.entity";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { Repository } from "typeorm";
import status from "http-status";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config({ path: `./env/${process.env.NODE_ENV}.env` });

// user repository instance
const userRepository: Repository<User> = AppDataSource.getRepository(User);

export async function signin(
  req: Request,
  res: Response
): Promise<{ token: string }> {
  let token: string;
  const reqData = req.body;
  const { username, email } = reqData;

  // check if user exists and throw not found exception
  const user = await findUserByEmail(email);
  if (user) {
    res.send(status[status.NOT_FOUND]);
  }
  // @ts-ignore
  const jwtSecret: Secret = process.env.JWT_SECRET_KEY;
  const jwtSignOptions: SignOptions = { expiresIn: 15 };

  token = jwt.sign({ username, email }, jwtSecret, jwtSignOptions);

  return { token };
}

export async function signup(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  // check if user exists with this {email} and throw conflict-exception
  const user = await findUserByEmail(email);
  if (user) {
    res.send(status[status.CONFLICT]);
  }

  // create user
  bcrypt.hash();

  return;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  return await userRepository.findOne({ where: { email } });
}
