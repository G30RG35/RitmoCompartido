import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";
import { Alerta } from "../../hooks/useAlert";

export const UnirseParty = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [severidad, setSeveridad] = useState("info");
  const [mensaje, setMensaje] = useState("Sin mensaje");
  const [open, setOpen] = useState(false);

  const { onChangeInput, dataForm } = useForm({
    Id: "",
    Pass: "",
  });

  const joinParty = () => {
    setLoading(true);
    socket.emit("BuscarParty", dataForm);
  };

  useEffect(() => {
    socket.on("Uniendose", () => {
      setMensaje("Uniéndose a la sala");
      setSeveridad("success");
      setOpen(true);
      setLoading(false);
      setTimeout(() => {
        navigate("/party/" + dataForm.Id);
      }, 2000);
    });

    socket.on("SalaNoExiste", () => {
      setMensaje("Sala no existe");
      setSeveridad("warning");
      setOpen(true);
      setLoading(false);
    });

    socket.on("ErrorPassword", () => {
      setMensaje("Contraseña errónea");
      setSeveridad("warning");
      setOpen(true);
      setLoading(false);
    });

    // Cleanup to avoid multiple subscriptions
    return () => {
      socket.off("Uniendose");
      socket.off("SalaNoExiste");
      socket.off("ErrorPassword");
    };
  }, [dataForm, navigate]);

  const Regresar = () => {
    navigate("/");
  };

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
