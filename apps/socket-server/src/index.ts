import * as DotEnv from "dotenv";
DotEnv.config();

import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { socketTagController } from "./controllers/tag.controller";
import { socketProjectController } from "./controllers/project.controller";
import { socketPriorityController } from "./controllers/priority.controller";
import { socketBoardController } from "./controllers/board.controller";
import { socketTasksController } from "./controllers/tasks.controller";

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3001;

io.on("connection", (socket) => {
  console.log("A user connected");
  console.log(socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    console.log(socket.id);
  });

  socketTagController(socket);
  socketProjectController(socket);
  socketPriorityController(socket);
  socketBoardController(socket);
  socketTasksController(socket);
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
