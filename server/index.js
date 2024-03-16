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

let hostConect = false;

const salas = [];

io.on("connection", (socket) => {
  socket.on("Peticion", (data) => {
    console.log(data);
  });

  socket.on("CrearParty", (data) => {
    const id = data.Id;
    const nombre = data.Nombre;
    const pass = data.Pass;

    const objectAux = { id: id, nombre: nombre, pass: pass };
    salas.push(objectAux);

    console.log(salas);
    console.log(
      "Sala creada con Id: " + data.Id + ", Nombre de la sala: " + data.Nombre
    );
  });

  socket.on("UnirseParty", (data) => {
    const salaEncontrada = salas.find((sala) => data.id == sala.id);
    console.log(salaEncontrada);
    socket.emit("sala", salaEncontrada);
  });

  socket.on("BuscarParty", (data) => {
    const id = data.Id;
    const pass = data.Password;

    const Sala = salas.find((sala) => sala.id == id);

    /**cambiar a objeto */
    const estado={
      validate:false,
      message:""
    }

    if (Sala != undefined) {
      validarConexionASala(Sala,estado,pass,id)
    } else {
      estado.message="Sala no encontrada"
      estado.validate=false
    }
    socket.emit('BuscarPartyRespuesta',estado)
  });

 const validarConexionASala =(Sala,estado,pass,id)=>{
  if (Sala.pass == pass) {
    socket.join(id);
    estado.message="Usuario conectado"
    estado.validate=true
  } else {
    estado.message="Pasword incorecta"
    estado.validate=false
  }
  
 }

  socket.on("UsuarioDesconectado", (data) => {
    if (data.rol == 2) {
      console.log(`El host se desconecto`);
      hostConect = false;

      const objetoAEliminar = salas.find((sala) => sala.id == data.id);

      const indiceObjetoAEliminar = salas.indexOf(objetoAEliminar);

      salas.splice(indiceObjetoAEliminar, 1);
      console.log(salas);
      return;
    } else {
      console.log(`El Usuario se desconecto`);
      return;
    }
  });
});

server.listen(3000);
console.log("Escuachando puerto ", 3000);
