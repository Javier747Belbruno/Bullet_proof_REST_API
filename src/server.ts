import express from "express";

import db from "./config/database.config";
import todoRouter from "./route";

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
app.use("/api/v1", todoRouter);

app.listen(port, () =>
  console.log(`App listening on http://localhost:${port}`)
);
