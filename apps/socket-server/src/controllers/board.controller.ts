import { Socket } from "socket.io";

const SOCKET_EVENT = {
  create: "board:create",
  update: "board:update",
  delete: "board:delete",
};

export const socketBoardController = (socket: Socket) => {
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
