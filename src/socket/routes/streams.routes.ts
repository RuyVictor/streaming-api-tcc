import { Server, Socket } from 'socket.io'
import { Stream } from '../models/Stream'

let activeRooms: { [key: string]: Stream } = {};

export function StreamsRoutes (io: Server, socket: Socket) {
    socket.on("getAllStreams", () => {
        Object.keys(activeRooms).forEach(roomId => {
            let roomExists = io.sockets.adapter.rooms.get(roomId)
            if (roomExists) {
                activeRooms[roomId].playersCount = io.sockets.adapter.rooms.get(roomId)!.size
            } else {
                delete activeRooms[roomId]
            }
        })

        const filteredRooms = Object.fromEntries(Object.entries(activeRooms).
        filter(([key, val]) => val.isPrivate === false ));

        socket.emit('receivedAllRooms', filteredRooms);
    })

    socket.on("createStream", (createInfo: RoomInfo) => {
        const roomId = generateId(4)
        activeRooms[roomId] = {
            capacity: createInfo.capacity,
            map: createInfo.map,
            owner: createInfo.owner,
            isPrivate: createInfo.isPrivate,
            playersCount: createInfo.playersCount
        }
        console.log('Created room:', roomId)
        socket.join(roomId)
        socket.emit('roomCreated', { roomInfo: activeRooms[roomId], roomId })
    })

    socket.on("joinStream", (roomId: string) => {
        const roomExists = io.sockets.adapter.rooms.get(roomId)

        if (roomExists) {
            let clientsInRoom = io.sockets.adapter.rooms.get(roomId)!.size

            if (clientsInRoom < activeRooms[roomId].capacity) {
                socket.join(roomId)
                socket.emit('enterInRoom')
                console.log('Player:', socket.id, 'entered in room:', roomId)
            } else {
                socket.emit('fullRoom')
            }
        } else {
            socket.emit('roomNotExists')
        }
    })
}