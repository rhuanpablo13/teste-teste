import express from "express";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(3000);
