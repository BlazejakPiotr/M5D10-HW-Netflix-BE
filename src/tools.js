import fs from "fs-extra";
import uniqid from "uniqid";

export const loadJSONFile = async (path) => {
  return JSON.parse(await fs.readFile(path));
};

export const writeJSONFile = async (path, body) => {
  await fs.writeFile(path, JSON.stringify(body));
};

export const getMediaByID = async (path, id) => {
  let data = await loadJSONFile(path);
  return data.find((m) => m.imdbID === id);
};

export const postRecord = async (path, body) => {
  let data = await loadJSONFile(path);
  let newRecord = {
    ...body,
    imdbID: uniqid(),
  };
  data.push(newRecord);
  await writeJSONFile(path, data);
};

export const editRecord = async (path, id, body) => {
  let data = await loadJSONFile(path);
  let filteredRecord = data.findIndex((d) => d.imdbID === id);
  data[filteredRecord] = {
    ...data[filteredRecord],
    ...body,
  };
  await writeJSONFile(path, data);
};

export const deleteRecord = async (path, id) => {
  let data = await loadJSONFile(path);
  let filteredData = data.filter((d) => d.imdbID !== id);
  await writeJSONFile(path, filteredData);
};

export const postReview = async (path, id, body) => {
  let data = await loadJSONFile(path);
  let newReview = {
    ...body,
    _id: uniqid(),
    elementId: id,
    createdAt: new Date(),
  };
  data.push(newReview);
  await writeJSONFile(path, data);
};

export const filterReviews = async (path, id) => {
  let data = await loadJSONFile(path);
  let filteredReviews = data.filter((r) => r.elementId === id);
  console.log(filteredReviews);
};
