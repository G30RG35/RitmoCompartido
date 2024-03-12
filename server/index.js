import express from "express";
import http from "http";
import { Server as SocketServer } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let hostConect=false

io.on("connection", (socket) => {
  if (socket.handshake.query.role === "host") {
    console.log("Host conectado");
  } else {
    console.log("Invitado conectado");
  }
  socket.on("Peticion", (data) => {
    console.log(data);
  });

  socket.on("UsuarioDesconectado", (data) => {
    if (data == 2) {
      console.log(`El host se desconecto`);
      hostConect=false
    } else {
      console.log(`El Usuario se desconecto`);
    }
  });
});

server.listen(3000);
console.log("Escuachando puerto ", 3000);
