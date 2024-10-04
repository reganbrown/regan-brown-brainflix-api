import express from "express";
import cors from "cors";
import videoRoutes from "./routes/videos.js";
const app = express();

app.use(cors());
app.use(express.static("public"));

app.use("/videos", videoRoutes);

app.listen(8080, function () {
  console.log("listening on port 8080");
});
