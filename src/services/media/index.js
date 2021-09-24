import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import {
  loadJSONFile,
  getMediaByID,
  postRecord,
  deleteRecord,
  editRecord,
} from "../../tools.js";

const mediaRouter = express.Router();

const mediaFileJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "media.json"
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
    res.send(await getMediaByID(mediaFileJSONPath, req.params.imdbID));
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
