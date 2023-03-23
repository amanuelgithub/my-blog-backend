import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Comment } from "./comment.entity";
import { Tag } from "./tag.entity";
import { User } from "./user.entity";

export interface IBlog {
  id: string;
  title: string;
  content: string;
  description: string;
  featuredImage: string;
  isPublished: boolean;
  views: number;
  likes: number;
  createAt: Date;
  updateAt: Date;
}

@Entity()
export class Blog implements IBlog {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  title: string;

  @Column()
  content: string;

  @Column()
  description: string;

  @Column()
  featuredImage: string;

  @Column({ default: false })
  isPublished: boolean;

  @Column({ nullable: true })
  views: number;

  @Column({ nullable: true })
  likes: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  // entity relationship
  @ManyToOne(() => User, (user) => user.blogs)
  author: User;

  @OneToMany(() => Comment, (comment) => comment.blog)
  comments: Comment[];

  @ManyToMany(() => Tag, { eager: true })
  @JoinTable()
  tags: Tag[];
}
