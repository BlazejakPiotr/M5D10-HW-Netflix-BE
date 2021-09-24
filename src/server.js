import express from "express";
import cors from "cors";
import mediaRouter from "./services/media/index.js";
import listEndpoints from "express-list-endpoints";

const server = express();
const port = 3001;

server.use(cors());
server.use(express.json());

server.use("/media", mediaRouter);

console.table(listEndpoints(server));

server.listen(port, () => {
  console.log("server running on port " + port);
});
