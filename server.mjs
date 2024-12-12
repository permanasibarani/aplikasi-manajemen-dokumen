import express from "express";
const app = express();
import homeRouter from "./routes/homeRoutes.mjs";
import open from "open";

const port = 3500;
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/home", homeRouter);

app.listen(port, () => {
  console.log("Serven is running on port 3500");
});

open("http://localhost:3500/home");
