// @ts-ignore
import express, {json, response} from "express";
import http from "http";
import cors from 'cors';
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

let users = [];

io.on("connection", (socket) => {
    socket.on("login", (data) => {
        users.push(data)
        console.log(users)
        socket.name = data.username
        socket.emit("login", data)       
    });

    socket.join("message");
    socket.on("message", (data) => {
        socket.to("message").emit("message", data)
    });
});

server.listen(3000, () => {
    console.log("Server running on port: 3000")
});

