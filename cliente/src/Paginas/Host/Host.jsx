import { Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import { socket } from "../../socket";
export const Host = () => {
  
  let { Id: Id } = useParams();
  let { Nombre: Nombre } = useParams();
  let { Pass: Pass } = useParams();

  useEffect(() => {
    socket.emit("CrearParty", {
      Id: Id,
      Nombre: Nombre,
      Pass:Pass,
    });
  }, []);

  function Desconectar() {
    const datos={
      rol:2,
      id:Id,
    }
    socket.emit('UsuarioDesconectado',datos);
  }
  window.addEventListener("beforeunload", (event) => {
    Desconectar()
  });

  window.addEventListener('popstate', () => {
    Desconectar()
  });

  const Buscar = () => {
    socket.emit('Peticion', dataForm.Texto);
  };


  const { onChangeInput, onSubmit, dataForm, setDataForm } = useForm({
    Texto: "",
  });



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

        <div>
          <p>Canciones pedidas</p>
          <ol></ol>
        </div>
      </div>
    </>
  );
};
