import * as DotEnv from "dotenv";
DotEnv.config();

import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { socketTagController } from "./controllers/tag.controller";

const app = express();
const server = createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 4000;

io.on("connection", (socket) => {
  console.log("A user connected");
  console.log(socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    console.log(socket.id);
  });

  socketTagController(socket);
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
