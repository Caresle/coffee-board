import { Socket } from "socket.io";

const SOCKET_EVENT = {
  create: "priority:create",
  update: "priority:update",
  delete: "priority:delete",
};

export const socketPriorityController = (socket: Socket) => {
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
