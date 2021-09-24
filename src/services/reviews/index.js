import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import {
  loadJSONFile,
  getMediaByID,
  postRecord,
  deleteRecord,
  editRecord,
  postReview,
} from "../../tools.js";

const reviewsRouter = express.Router();

const mediaFileJSONPath = join(process.cwd(), "src/services/media/media.json");
const reviewsFileJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "reviews.json"
);

reviewsRouter.post("/:imdbID/reviews", async (req, res) => {
  await postReview(reviewsFileJSONPath, req.params.imdbID, req.body);
  res.send("OK");
});

export default reviewsRouter;
