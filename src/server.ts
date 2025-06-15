import express from "express";
import authRoutes from "./routes/auth";
import { logger } from "./utils/logger";

const app = express();
const port = 3000;
app.use(express.json());
app.use(logger);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/auth", authRoutes);
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
