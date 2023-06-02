import { IsNotEmpty, IsString, IsBoolean } from "class-validator";

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  content: any;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  featuredImage: string;

  @IsNotEmpty()
  @IsBoolean()
  isPublished: boolean;
}
