import express from "express";
import dotenv from "dotenv";
import { dbconnection } from "./db/db-connections.js";
import userRouter from "./src/modules/user/user.routes.js";

const app = express();
dotenv.config(); // You use dotenv.config() at the very beginning of your application's entry point (e.g., app.js or index.js). This function reads the .env file and adds all the variables inside it to process.env.
const port = process.env.PORT || 3000;

app.use(express.json()); // Checks the incoming request to see if it has a Content-Type: application/json header. // Reads the raw data from the request body. // Parses the JSON string into a regular JavaScript object.
app.get("/", (req, res) => res.send("Hello World!"));
dbconnection();

app.use("/", userRouter);
// app.use("/api/v1/category", categoryRouter);

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).json({ error: "server fallen" });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
