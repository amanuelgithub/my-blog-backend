import { Request, Response } from "express";
import httpStatus from "http-status";
import AppDataSource from "../config/app-data-source";
import { User } from "../entities/user.entity";
import * as bcrypt from "bcrypt";
import { IBaseResponse } from "../interfaces/base-response.interface";

const userRepository = AppDataSource.getRepository(User);

export async function findUsers(req: Request, res: Response) {
  let apiResponse: IBaseResponse<User[]>;

  const users = await userRepository.find();

  if (!users) {
    apiResponse = {
      status: httpStatus.NOT_FOUND,
      message: httpStatus["404_NAME"],
    };

    res.send(apiResponse);
  }

  apiResponse = {
    status: httpStatus.FOUND,
    message: httpStatus["302_NAME"],
    data: users,
  };
  res.send(apiResponse);
  // return users;
}

export async function createUser(req: Request, res: Response) {
  let apiResponse: IBaseResponse<User>;
  try {
    const userFormData: User = req.body;
    const { password, ...remaining } = userFormData;

    // hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = userRepository.create({
      ...remaining,
      password: hashedPassword,
    });

    await userRepository.save(user);

    apiResponse = {
      status: httpStatus.CREATED,
      message: "user created!",
      data: { ...remaining } as User,
    };

    res.send(apiResponse);
  } catch (err: any) {
    apiResponse = {
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: httpStatus["500_NAME"],
      error: err.message,
    };

    res.send(apiResponse);
  }
}
