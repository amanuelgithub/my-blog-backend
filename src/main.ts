import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import routes from "./routes";

dotenv.config({ path: `./env/${process.env.NODE_ENV}.env` });

// create and setup express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/", routes);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port: ${port}`));
