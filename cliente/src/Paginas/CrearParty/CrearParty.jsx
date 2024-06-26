import { Button, Grid, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { Alerta } from "../../hooks/useAlert";
import { socket } from "../../socket";

import "../../index.css";

export const CrearParty = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [mensaje, setMensaje] = useState("Sin mensaje");
  const [severidad, setSeveridad] = useState("info");

  const { onChangeInput, dataForm } = useForm({
    Id: "",
    Nombre: "",
    Pass: "",
  });

  const Crear = () => {
    if (dataForm.Id === "" || dataForm.Nombre === "" || dataForm.Pass === "") {
      setMensaje("Llene todo los datos");
      setSeveridad("warning");
      setOpen(true);
      return;
    }
    setLoading(true);
    socket.emit("CrearParty", dataForm);
  };

  useEffect(() => {
    socket.on("SalaCreada", () => {
      setMensaje("Sala creada");
      setSeveridad("success");
      setOpen(true);
      setLoading(false);
      setTimeout(() => {
        navigate(`/party/${dataForm.Id}/${dataForm.Nombre}/${dataForm.Pass}`);
      }, 2000);
    });

    socket.on("SalaYaExiste", () => {
      setMensaje("Sala ya existe");
      setSeveridad("warning");
      setOpen(true);
      setLoading(false);
    });

    // Cleanup to avoid multiple subscriptions
    return () => {
      socket.off("SalaCreada");
      socket.off("SalaYaExiste");
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
          onChange={onChangeInput}
          name="Id"
          value={dataForm.Id}
          label="Id de Fiesta"
          variant="outlined"
          className="Inputs"
          color="black"
        />
        <TextField
          className="Inputs"
          id="outlined-basic"
          variant="outlined"
          label="Nombre de la Fiesta"
          onChange={onChangeInput}
          name="Nombre"
          value={dataForm.Nombre}
          color="black"
        />

        <TextField
          className="Inputs"
          id="Contraseña-input"
          label="Contraseña"
          variant="outlined"
          onChange={onChangeInput}
          name="Pass"
          value={dataForm.Pass}
          color="black"
        />

        <div className="divButons">
          <Button onClick={Regresar} variant="contained" color="black">
            Regresar
          </Button>
          <Button
            disabled={loading}
            onClick={Crear}
            variant="contained"
            color="black"
          >
            Crear
          </Button>
        </div>
      </div>
    </>
  );
};
