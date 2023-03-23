import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class TagBlogDto {
  @IsNotEmpty()
  @IsString()
  blogId: string;

  @IsNotEmpty()
  @IsString()
  tagId: string;
}
