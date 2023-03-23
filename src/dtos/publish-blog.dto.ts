import { IsBoolean, IsNotEmpty } from "class-validator";

export class PublishBlogDto {
  @IsNotEmpty()
  @IsBoolean()
  isPublished: boolean;
}
