import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  //   @Matches("")
  password: string;
}
