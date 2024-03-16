import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import { socket } from "../../socket";

export const Invitado = () => {
  let { Id: Id } = useParams();
  let { Pass: Pass } = useParams();

  useEffect(() => {
    socket.emit("BuscarParty", { Id, Pass });
  }, []);

  function Desconectar() {
    const datos = {
      rol: 1,
      id: Id,
    };
    socket.emit("UsuarioDesconectado", datos);
  }

  // window.addEventListener("beforeunload", (event) => {
  //   Desconectar;
  // });

  window.addEventListener("popstate", () => {
    Desconectar;
  });

  const [Nombre, setNombre] = useState("");

  const { onChangeInput, onSubmit, dataForm, setDataForm } = useForm({
    Texto: "sin nombre",
  });

  const Buscar = () => {
    socket.emit("Peticion", dataForm.Texto);
  };

  // const TraerDatos = () => {
  //   setNombre("Eduardos");
  // };

  // useEffect(() => {
  //   TraerDatos();

  //   const datos = {
  //     id: Id,
  //     pass: Pass,
  //   };
  //   socket.emit("UnirseParty", datos);
  // }, []);

  // socket.on("sala", (data) => {
  //   console.log(
  //     "Mensaje recibido:",
  //     data.id + "," + data.nombre + "," + data.pass
  //   );
  // });

  return (
    <>
      <div className="divInicial">
        <div className="divmini">
          <p> Ritmo Compartido</p>
          <div className="red-box-mini"></div>
        </div>
        <p>
          Nombre de la Fiesta: {Nombre}
          <br />
          Id de la Fiesta: {Id}
        </p>
        <div style={{ display: "flex" }}>
          <TextField
            style={{ borderRadius: "1em" }}
            className="Inputs"
            id="Id-input"
            label="Buscar"
            variant="filled"
            onChange={onChangeInput}
            name="Texto"
            value={dataForm.Texto}
          />
          <Button
            style={{ margin: "5px" }}
            onClick={Buscar}
            variant="contained"
          >
            <MagnifyingGlassIcon />
          </Button>
        </div>
      </div>
    </>
  );
};
