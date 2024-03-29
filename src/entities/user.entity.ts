import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Blog } from "./blog.entity";
import { Comment } from "./comment.entity";

export enum UserRoleEnum {
  ADMIN = "ADMIN",
  GUEST = "GUEST",
}

export interface IUser {
  id: string;
  role: UserRoleEnum;
  username: string;
  email: string;
  password: string;
  profileImage: string;
  joiningDate: Date;
  token: string;
}

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: UserRoleEnum.GUEST })
  role: UserRoleEnum;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  profileImage: string;

  @CreateDateColumn()
  joiningDate: Date;

  @Column({ nullable: true, select: false })
  token: string;

  // entity relationship
  @OneToMany(() => Blog, (blog) => blog.author)
  blogs: Blog[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
