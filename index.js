import express from "express";
import cors from "cors";
import videoRoutes from "./routes/videos.js";
const app = express();
import "dotenv/config";

const { PORT, BACKEND_URL } = process.env;

app.use(cors());
app.use(express.static("public"));

app.use("/videos", videoRoutes);

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}`);
});
