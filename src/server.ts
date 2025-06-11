import express from "express";
import authRoutes from "./routes/auth";
const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/auth", authRoutes);
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
