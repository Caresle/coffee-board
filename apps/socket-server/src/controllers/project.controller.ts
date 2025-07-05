import { Socket } from "socket.io";

const SOCKET_EVENT = {
  create: "project:create",
  update: "project:update",
  delete: "project:delete",
};

export const socketProjectController = (socket: Socket) => {
  socket.on(SOCKET_EVENT.create, (data) => {
    socket.broadcast.emit(SOCKET_EVENT.create, data);
  });

  socket.on(SOCKET_EVENT.update, (data) => {
    socket.broadcast.emit(SOCKET_EVENT.update, data);
  });

  socket.on(SOCKET_EVENT.delete, (data) => {
    socket.broadcast.emit(SOCKET_EVENT.delete, data);
  });
};
