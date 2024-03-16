import { Button, TextField } from "@mui/material";
import React from "react";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { socket } from "../../socket";
import { Alerta } from "../../hooks/useAlert";

export const UnirseParty = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [severidad, setseveridad] = useState("info");
  const [mensaje, setmensaje] = useState("Sin mensaje");
  const [open, setOpen] = useState(false);

  const { onChangeInput, onSubmit, dataForm, setDataForm } = useForm({
    Id: "",
    Password: "",
  });

  function joinParty() {
    setloading(true);
    socket.emit("BuscarParty", dataForm);
    socket.on("BuscarPartyRespuesta", (estado) => {
      setmensaje(estado.message);
      estado.validate?setseveridad("success"):setseveridad("warning")
      setOpen(!open)
    });
    setloading(false);
    // navigate("/party/invitado/" + dataForm.Id+"/"+dataForm.Password);
  }

  function Regresar() {
    navigate("/");
  }

  return (
    <>
      <Alerta
        severidad={severidad}
        mensaje={mensaje}
        open={open}
        setOpen={setOpen}
      />
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

          <Button onClick={joinParty} variant="contained" disabled={loading}>
            Unirse
          </Button>
        </div>
      </div>
    </>
  );
};
