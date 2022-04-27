import { Server, Socket } from "socket.io";

export interface IChat {
    roomId?: string;
    userName?: string;
    message?: string;
}

let activeRooms: { [key: string]: IChat } = {};

export function ChatRoutes(io: Server, socket: Socket) {
    socket.on("join-chat-room", roomId => {
        socket.join(roomId);
    });

    socket.on("send-chat-message", (data: IChat) => {
        io.to(data.roomId).emit("chat-message", data);
    });
}
