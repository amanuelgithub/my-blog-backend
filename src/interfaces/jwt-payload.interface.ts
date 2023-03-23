import { UserRoleEnum } from "../entities/user.entity";

export interface JWTPayload {
  sub: string; // user id
  username: string;
  email: string;
  role: UserRoleEnum;
}
