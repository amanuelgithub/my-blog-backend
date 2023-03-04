import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Blog } from "./blog.entity";
import { User } from "./user.entity";

export interface IComment {
  id: string;
  content: string;
  createAt: Date;
}

@Entity()
export class Comment implements IComment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createAt: Date;

  // parent-child or nested children relationships
  // one-to-many relationship to another comment
  @ManyToOne(() => Comment, (comment) => comment.parent)
  children: Comment[];
  // many-to-one relationship to another comment
  @OneToMany(() => Comment, (comment) => comment.children)
  parent: Comment;

  // other entity related properties
  @ManyToOne(() => Blog, (blog) => blog.comments)
  blog: Blog;

  @ManyToOne(() => User, (user) => user.comments)
  author: User;
}
