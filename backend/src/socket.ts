import { Server, Socket } from "socket.io";
import prisma from "./config/db.config";
import { produceMessage } from "./helper";

interface CustomSocket extends Socket {
  room?: string;
}

export const setupSocket = async (io: Server) => {
  io.use((socket: CustomSocket, next) => {
    const room = socket.handshake.auth.room || socket.handshake.headers.room;

    if (!room) {
      return next(new Error("Invalid room"));
    }

    socket.room = room;
    next();
  });

  io.on("connection", (socket: CustomSocket) => {
    // Join the room
    socket.join(socket.room as string);

    console.log("The socket is connected...", socket.id);

    socket.on("message", async (data) => {
      // socket.broadcast.emit("message", data)
      // await prisma.chats.create({
      //   data: data,
      // });

      await produceMessage(process.env.KAFKA_TOPIC!, data)
      socket.to(socket.room as string).emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);
    });
  });
};
