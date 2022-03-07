import db from "./config/database.config";
import app from "./app";

db.sync()
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log("Error in connection");
  });

const port = 9000;

app.listen(port, () =>
  console.log(`App listening on http://localhost:${port}`)
);
