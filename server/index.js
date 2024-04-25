const http = require("http");
const server = http.createServer();

const io = require("socket.io")(server, {
  cors: { origin: "*" },
});

const Salas = [];
let listItems = [];

function handleAddListItem(text) {
  listItems = [];
  const newListItems = [...listItems, text];
  listItems = newListItems;
}

const petitions = {};

io.on("connection", (socket) => {
  console.log("Se a conectado un cliente");

  socket.on("BuscarParty", (data) => {
    let salaEncontrada = Salas.find((sala) => sala.id === data.Id);
    let passwordValida = salaEncontrada && salaEncontrada.pass === data.Pass;

    if (salaEncontrada) {
      if (passwordValida) {
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
    const indiceObjeto = Salas.findIndex((objeto) => objeto.id === data.id);
    if (indiceObjeto) {
      Salas.push({
        id: data.Id,
        name: data.Nombre,
        pass: data.Pass,
      });
      socket.join(data.Id);
      socket.emit("Sala Creada");
    } else {
      socket.emit("Sala ya existe");
    }
    console.log(Salas);
  });

  socket.on("Eliminar sala", (data) => {
    const indiceObjeto = Salas.findIndex((objeto) => objeto.id === data.Id);
    if (indiceObjeto) {
      Salas.splice(indiceObjeto, 1);
    }
    socket.emit("Sala Borrada");
  });

  socket.on("Peticion", (data) => {
    const { Texto, Id } = data;

    const userPetitions = petitions[Id] || [];

    userPetitions.push({ Texto, Id });

    petitions[Id] = userPetitions;

    io.to(Id).emit("PeticionesActualizadas" + Id, userPetitions);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

server.listen(3000);
console.log("Escuachando puerto ", 3000);
