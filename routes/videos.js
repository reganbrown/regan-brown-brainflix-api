import express from "express";
const router = express.Router();
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

router.use(express.json());

router.get("/", (req, res) => {
  try {
    let videos = JSON.parse(fs.readFileSync("./data/videos.json"));
    let videoList = [];
    videos.map((video) => {
      videoList.push({
        id: video.id,
        title: video.title,
        channel: video.channel,
        image: video.image,
      });
    });
    res.status(200).send(videoList);
  } catch (error) {
    res.status(400).send("error fetching video list");
  }
});

router.get("/:id", (req, res) => {
  try {
    let videos = JSON.parse(fs.readFileSync("./data/videos.json"));
    let video = videos.find((video) => {
      if (video.id === req.params.id) {
        return video;
      }
    });
    if (video) {
      res.status(200).send(video);
    } else {
      res.status(404).send("404 Video not found");
    }
  } catch (error) {
    res.status(400).send("error fetching video details");
  }
});

router.post("/", (req, res) => {
  try {
    let videos = JSON.parse(fs.readFileSync("./data/videos.json"));
    const { title, channel, description, image } = req.body;
    const newVideo = {
      id: uuidv4(),
      title: title,
      channel: channel,
      image: image,
      description: description,
      views: "0",
      likes: "0",
      duration: "49:20",
      video: "https://unit-3-project-api-0a5620414506.herokuapp.com/stream",
      timestamp: Date.now(),
      comments: [],
    };
    videos.push(newVideo);
    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
    res.status(200).send(newVideo);
  } catch (error) {
    res.status(400).send("Error posting new video");
  }
});

router.post("/:id/comments/", (req, res) => {
  try {
    let videos = JSON.parse(fs.readFileSync("./data/videos.json"));
    let { name, comment } = req.body;
    const newComment = {
      id: uuidv4(),
      name: name,
      comment: comment,
      likes: "0",
      timestamp: Date.now(),
    };
    let video = videos.find((video) => {
      if (video.id === req.params.id) {
        return video;
      }
    });
    video.comments.push(newComment);
    console.log(video);

    let videoIndex = videos.findIndex((video) => video.id === req.params.id);
    videos[videoIndex] = video;
    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
    res.status(200).send(video);
  } catch (error) {
    res.status(400).send("Error posting comment");
  }
});

router.delete("/:id/comments/:commentID", (req, res) => {
  try {
    let videos = JSON.parse(fs.readFileSync("./data/videos.json"));
    let video = videos.find((video) => {
      if (video.id === req.params.id) {
        return video;
      }
    });

    let comment = video.comments.find((comment) => {
      if (comment.id === req.params.commentID) {
        return comment;
      }
    });

    let commentIndex = video.comments.findIndex(
      (comment) => comment.id === req.params.commentID
    );

    console.log(video);
    console.log(video.comments[commentIndex]);
    video.comments.splice(commentIndex, 1);

    let videoIndex = videos.findIndex((video) => video.id === req.params.id);
    videos[videoIndex] = video;
    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
    console.log("found", comment.id);
    res.status(200).send("deleted");
  } catch (error) {
    res.status(400).send("Error deleting comment");
  }
});
export default router;
