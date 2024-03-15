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

<<<<<<< HEAD
    const objectAux = { id: id, nombre: nombre, pass: pass };
    salas.push(objectAux);

    console.log(salas);
    console.log(
      "Sala creada con Id: " + data.Id + ", Nombre de la sala: " + data.Nombre
    );
  });

  socket.on("UnirseParty", (data) => {
    console.log("id = "+data.id+" pass = "+data.pass)
    // const salaEncontrada=salas.find((sala)=>data.id==sala.id);
    // console.log(salaEncontrada)
=======
    salas.push({id: id,nombre: nombre,pass: pass})
    console.log("Salas: "+salas)
    console.log("Sala creada con Id: " + data.Id + ", Nombre de la sala: " + data.Nombre)
>>>>>>> f2d0014dd3884ccd97ded0381c6da853e6697cb4
  });

   socket.on("BuscarParty", (data) => {
    const id= data.Id
    const pass = data.Pass

   const Sala=salas.find((sala) =>
     sala.id==id
             )
     if(Sala!=undefined){
       if(Sala.pass==pass){
         socket.join(id);
         console.log("Usuario conectado")
       }else{
         console.log("Pasword incorecta")
       }
    }else{
       console.log("Sala no encontrada")
    }
  });

  

  socket.on("UsuarioDesconectado", (data) => {
    if (data.rol == 2) {
      console.log(`El host se desconecto`);
      hostConect = false;

      const objetoAEliminar = salas.find((sala) => sala.id == data.id);

      const indiceObjetoAEliminar = salas.indexOf(objetoAEliminar);

      salas.splice(indiceObjetoAEliminar, 1);
      console.log(salas);
    } else {
      console.log(`El Usuario se desconecto`);
    }
  });
});

server.listen(3000);
console.log("Escuachando puerto ", 3000);
