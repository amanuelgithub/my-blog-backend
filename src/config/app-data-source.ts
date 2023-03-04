import { DataSource } from "typeorm";
import { Blog } from "../entities/blog.entity";
import { Comment } from "../entities/comment.entity";
import { Tag } from "../entities/tag.entity";
import { User } from "../entities/user.entity";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "my_blog",
  entities: [User, Blog, Comment, Tag],
  logging: true,
  synchronize: true,
});

// establish database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

export default AppDataSource;
