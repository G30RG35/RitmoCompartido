import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

export const CrearParty = () => {
  const socket = io.connect("localhost:3000", {
    query: {
      role: "host",
    },
  });

  const navigate = useNavigate();

  const { onChangeInput, onSubmit, dataForm, setDataForm } = useForm({
    Id: "",
    Nombre: "",
    Pass: "",
  });

  function Crear() {
    navigate("/party/" + dataForm.Id + "/" + dataForm.Nombre+"/"+dataForm.Pass);
  }

  function Regresar() {
    navigate("/");
  }

  return (
    <>
      <div className="divInicial">
        <p> Ritmo Compartido</p>
        <div className="red-box"></div>
        <TextField
          className="Inputs"
          id="Id-input"
          label="Id de Fiesta"
          variant="filled"
          onChange={onChangeInput}
          name="Id"
          value={dataForm.Id}
        />
        <TextField
          className="Inputs"
          id="Fiesta-input"
          label="Nombre de la Fiesta"
          variant="filled"
          onChange={onChangeInput}
          name="Nombre"
          value={dataForm.Nombre}
        />
        <TextField
          className="Inputs"
          id="Contraseña-input"
          label="Contraseña"
          variant="filled"
          onChange={onChangeInput}
          name="Password"
          value={dataForm.Pass}
        />

        <div className="divButons">
          <Button onClick={Regresar} variant="contained">
            Regresar
          </Button>

          <Button onClick={Crear} variant="contained">
            Crear
          </Button>
        </div>
      </div>
    </>
  );
};
