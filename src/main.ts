import "reflect-metadata";
import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import dataSource from "./config/app-data-source";
import { User } from "./entity/user.entity";

dotenv.config({ path: `./env/${process.env.NODE_ENV}.env` });

// establish database connection
dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

// create and setup express app
const app = express();
app.use(express.json());

app.get("/users", async function (req: Request, res: Response) {
  const users = await dataSource.getRepository(User).find();
  res.json(users);
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port: ${port}`));
