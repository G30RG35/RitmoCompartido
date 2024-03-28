import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { Alerta } from "../../hooks/useAlert";
import { socket } from "../../socket"; 

export const CrearParty = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const [open, setOpen] = useState(false);
  const [mensaje, setmensaje] = useState("Sin mensaje");
  const [severidad, setseveridad] = useState("info");


  const { onChangeInput, onSubmit, dataForm, setDataForm } = useForm({
    Id: "",
    Nombre: "",
    Pass: "",
  });

  // function Crear() {
  //   navigate("/party/" + dataForm.Id + "/" + dataForm.Nombre+"/"+dataForm.Pass);
  // }

  const Crear = () => {
    console.log(dataForm)
    if (dataForm.Id==""||dataForm.Nombre==""||dataForm.Pass=="") {
      setmensaje("Llene todo los datos")
      setseveridad("warning")
      setOpen(true)
      return
    }
    setLoading(true)
    socket.emit('CrearParty',dataForm);
  }

  socket.on("Sala Creada",()=>{
    setmensaje("Sala Creada")
    setseveridad("success")
    setOpen(true)
    setTimeout(() => {
      navigate("/party/" + dataForm.Id + "/" + dataForm.Nombre+"/"+dataForm.Pass);
    }, 2000);
    
  })

  socket.on("Sala ya existe",()=>{
    setmensaje("Sala ya existe")
    setseveridad("warning")
    setOpen(true)
    setLoading(false)
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
          name="Pass"
          value={dataForm.Pass}
        />

        <div className="divButons">
          <Button onClick={Regresar} variant="contained">
            Regresar
          </Button>

          <Button disabled={loading} onClick={Crear} variant="contained">
            Crear
          </Button>
        </div>
      </div>
    </>
  );
};
