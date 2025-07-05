import { Socket } from "socket.io";

const SOCKET_EVENT = {
  create: "tag:create",
  update: "tag:update",
  delete: "tag:delete",
};

interface SocketData {
  id: number;
  name: string;
  color: string;
}

export const socketTagController = (socket: Socket) => {
  socket.on(SOCKET_EVENT.create, (data: SocketData) => {
    socket.broadcast.emit(SOCKET_EVENT.create, data);
  });

  socket.on(SOCKET_EVENT.update, (data: SocketData) => {
    socket.broadcast.emit(SOCKET_EVENT.update, data);
  });

  socket.on(SOCKET_EVENT.delete, (data: SocketData) => {
    socket.broadcast.emit(SOCKET_EVENT.delete, data);
  });
};
