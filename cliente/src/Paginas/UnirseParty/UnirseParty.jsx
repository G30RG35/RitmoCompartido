import { Button, TextField } from "@mui/material";
import React from "react";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

export const UnirseParty = () => {
  const socket = io.connect("localhost:3000", {
    query: {
      role: "Invitado",
    },
  });

  const navigate = useNavigate();

  const { onChangeInput, onSubmit, dataForm, setDataForm } = useForm({
    Id: "",
    Password: "",
  });

  function Unirse() {
    navigate("/party/invitado/" + dataForm.Id+dataForm.Password);
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
          id="Contraseña-input"
          label="Contraseña"
          variant="filled"
          onChange={onChangeInput}
          name="Password"
          value={dataForm.Password}
        />
        <div className="divButons">
          <Button onClick={Regresar} variant="contained">
            Regresar
          </Button>

          <Button onClick={Unirse} variant="contained">
            Unirse
          </Button>
        </div>
      </div>
    </>
  );
};
