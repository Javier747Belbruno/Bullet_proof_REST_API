import express, { NextFunction, Request, Response } from "express";

import db from "./config/database.config";
import { v4 as uuidv4 } from "uuid";
import { TodoInstance } from "./model";
import TodoValidator from "./validator";
import Middleware from "./middleware";

db.sync()
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log("Error in connection");
  });

const app = express();
const port = 9000;

app.use(express.json());

app.post(
  "/create",
  TodoValidator.checkCreateTodo(),
  Middleware.handleValidationError,
  async (req: Request, res: Response) => {
    const id = uuidv4();
    try {
      const record = await TodoInstance.create({ ...req.body, id });
      return res.json({ record, msg: "Record created successfully" });
    } catch (err) {
      console.log(err);
      return res.json({
        msg: "Error in creating record",
        status: 500,
        route: "/create",
      });
    }
  }
);

//http://localhost:9000/read?limit=1&offset=2
app.get(
  "/read",
  TodoValidator.checkReadTodo(),
  Middleware.handleValidationError,
  async (req: Request, res: Response) => {
    try {
      const limit = req.query?.limit as number | undefined;
      const offset = req.query?.offset as number | undefined;
      const records = await TodoInstance.findAll({ where: {}, limit, offset });
      return res.json({ records, msg: "Records fetched successfully" });
    } catch (err) {
      console.log(err);
      return res.json({
        msg: "Error in fetching records",
        status: 500,
        route: "/read",
      });
    }
  }
);

app.listen(port, () =>
  console.log(`App listening on http://localhost:${port}`)
);
