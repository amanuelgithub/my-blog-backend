import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Blog } from "./blog.entity";

export interface ITag {
  id: string;
  name: string;
  description: string;
}

@Entity()
export class Tag implements ITag {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  // entity relationship
  //   @ManyToMany(() => Blog, (blog) => blog.tags)
  //   blogs: Blog[];
}
