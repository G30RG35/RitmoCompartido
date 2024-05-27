const http = require("http");
const server = http.createServer();

const io = require("socket.io")(server, {
  cors: { origin: "*" },
});

const Salas = [];
let listItems = [];
const petitions = {};

io.on("connection", (socket) => {
  console.log("Se ha conectado una persona al servidor");
  console.log("Id del socket BP", socket.id);

  socket.on("BuscarParty", (data) => {
    let salaEncontrada = Salas.find((sala) => sala.id === data.Id);
    let passwordValida = salaEncontrada && salaEncontrada.pass === data.Pass;

    if (salaEncontrada) {
      if (passwordValida) {
        console.log("Id del socket BP", socket.id);
        socket.join(data.Id);
        socket.emit("Uniendose");
      } else {
        socket.emit("ErrorPassword");
      }
    } else {
      socket.emit("Sala no existe");
    }
  });

  socket.on("CrearParty", (data) => {
    const indiceObjeto = Salas.findIndex((objeto) => objeto.id === data.Id);
    if (indiceObjeto === -1) {
      Salas.push({
        id: data.Id,
        name: data.Nombre,
        pass: data.Pass,
      });
      console.log("Id del socket CP", socket.id);
      socket.join(data.Id);
      socket.emit("SalaCreada");
    } else {
      socket.emit("Sala ya existe");
    }
    console.log(Salas);
  });

  socket.on("EliminarSala", (data) => {
    const indiceObjeto = Salas.findIndex((objeto) => objeto.id === data.Id);
    if (indiceObjeto !== -1) {
      Salas.splice(indiceObjeto, 1);
    }
    socket.emit("SalaBorrada");
  });

  socket.on("Peticion", (data) => {
    const { Texto, Id } = data;
    const userPetitions = petitions[Id] || [];
    userPetitions.push({ Texto, Id });
    petitions[Id] = userPetitions;
    io.to(Id).emit("PeticionesActualizadas", userPetitions);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

server.listen(3000);
console.log("Escuchando en el puerto ", 3000);
