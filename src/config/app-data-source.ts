import { DataSource } from "typeorm";
import { Blog } from "../entity/blog.entity";
import { Comment } from "../entity/comment.entity";
import { Tag } from "../entity/tag.entity";
import { User } from "../entity/user.entity";

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
