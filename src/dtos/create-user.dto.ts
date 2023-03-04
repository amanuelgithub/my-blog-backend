import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Matches,
  IsString,
} from "class-validator";
import { UserRoleEnum } from "../entities/user.entity";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  //   @Matches("") // put some regex for password validation
  password: string;

  @IsOptional()
  @IsString()
  profileImage: string;
}
