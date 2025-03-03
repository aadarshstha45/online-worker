import cors from "cors";
import express, { urlencoded } from "express";
import { PORT } from "./config/env.js";
import db from "./src/database/index.js";
import routes from "./src/routes/index.js";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1", routes);

app.listen(PORT, async () => {
  await db();
  console.log("Server is running on http://localhost:" + PORT);
});
