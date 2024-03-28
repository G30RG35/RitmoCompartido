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
    Pass: "",
  });

  const joinParty = () => {
    setloading(true);
    socket.emit("BuscarParty",dataForm);
      
  }

  socket.on("Uniendose",()=>{
    setmensaje("Uniendose a la sala");
    setseveridad("success")
    setOpen(true)
    setTimeout(() => {
      navigate("/party/"+ dataForm.Id);
    }, 2000);
  })

  socket.on("Sala no existe",()=>{
    setmensaje("Sala no existe");
    setseveridad("warning")
    setOpen(true)
    setloading(false);
  })

  socket.on("ErrorPassword",()=>{
    setmensaje("Contraseña Erronea");
    setseveridad("warning")
    setOpen(true)
    setloading(false);
  })

  function Regresar() {
    navigate("/");
  }

  return (
    <>
       {Alerta(severidad, mensaje, open, setOpen, 5000)}
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
          name="Pass"
          value={dataForm.Pass}
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
