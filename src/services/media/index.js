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
  filterReviews,
} from "../../tools.js";

const mediaRouter = express.Router();

const mediaFileJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "media.json"
);

const reviewsFileJSONPath = join(
  process.cwd(),
  "src/services/reviews/reviews.json"
);

// POST
mediaRouter.post("/", async (req, res) => {
  try {
    await postRecord(mediaFileJSONPath, req.body);
    res.status(201).send("New media has been added");
  } catch (error) {
    console.log(error);
  }
});

// GET (reviews included)
mediaRouter.get("/", async (req, res) => {
  try {
    res.send(await loadJSONFile(mediaFileJSONPath));
  } catch (error) {
    console.log(error);
  }
});

// GET by ID (with reviews)
mediaRouter.get("/:imdbID", async (req, res) => {
  try {
    let reviews = await loadJSONFile(reviewsFileJSONPath);
    let filteredReviews = reviews.filter(
      (r) => r.elementId === req.params.imdbID
    );
    console.log(filteredReviews);
    let media = await getMediaByID(mediaFileJSONPath, req.params.imdbID);
    let mediaWithRevies = {
      ...media,
      reviews: [...reviews],
    };

    res.send(mediaWithRevies);
  } catch (error) {
    console.log(error);
  }
});

// PUT by ID
mediaRouter.put("/:imdbID", async (req, res) => {
  try {
    await editRecord(mediaFileJSONPath, req.params.imdbID, req.body);
    res.send("Media data has been changed");
  } catch (error) {
    console.log(error);
  }
});

// DELETE by ID
mediaRouter.delete("/:imdbID", async (req, res) => {
  try {
    await deleteRecord(mediaFileJSONPath, req.params.imdbID);
    res.status(204).send("deleted");
  } catch (error) {}
});

// /media/:id/poster
// POST Poster to single media

// /media/:id/reviews
// POST Review to media

// DELETE Review of media

export default mediaRouter;
