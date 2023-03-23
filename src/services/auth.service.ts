import { Request, Response } from "express";
import AppDataSource from "../config/app-data-source";
import { User } from "../entities/user.entity";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { Repository } from "typeorm";
import status from "http-status";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import { JWTPayload } from "../interfaces/jwt-payload.interface";
import { notFoundRes, successRes } from "../util/custom-response";

dotenv.config({ path: `./env/${process.env.NODE_ENV}.env` });

// user repository instance
const userRepository: Repository<User> = AppDataSource.getRepository(User);

export async function signin(req: Request, res: Response) {
  let token: string;
  const { email } = req.body;

  // check if user exists and throw not found exception
  const user = await findUserByEmail(email);
  if (!user) {
    res.send(status[status.NOT_FOUND]);
  } else {
    // @ts-ignore
    const jwtSecret: Secret = process.env.JWT_SECRET_KEY;
    const jwtSignOptions: SignOptions = { expiresIn: "2 days" };
    const jwtPayload: JWTPayload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    token = jwt.sign(jwtPayload, jwtSecret, jwtSignOptions);

    // store token database after successful login
    user.token = token;
    await userRepository.save(user);

    res.send({ token });
  }
}

export async function logout(req: Request, res: Response) {
  // @ts-ignore
  const { sub: userId } = req.user;

  const user = await userRepository.findOne({ where: { id: userId } });

  if (!user || !user.token) {
    res.send(notFoundRes());
  } else {
    user.token = "";
    await userRepository.save(user);
    res.send(successRes());
  }
}

// export async function signup(req: Request, res: Response): Promise<void> {
//   const { email, password } = req.body;

//   // check if user exists with this {email} and throw conflict-exception
//   const user = await findUserByEmail(email);
//   if (user) {
//     res.send(status[status.CONFLICT]);
//   }

//   // create user
//   // bcrypt.hash();

//   return;
// }

export async function findUserByEmail(email: string): Promise<User | null> {
  return await userRepository.findOne({ where: { email } });
}
