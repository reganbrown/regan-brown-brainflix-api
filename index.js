import express from "express";
import cors from "cors";
import videoRoutes from "./routes/videos.js";
const app = express();

app.use(cors());

app.use("/id", videoRoutes);

app.listen(8080, function () {
  console.log("listening on port 8080");
});
