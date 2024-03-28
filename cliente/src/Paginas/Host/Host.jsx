import { Button, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import ArrowLeftIcon from "@heroicons/react/24/outline/ArrowLeftIcon";
import { socket } from "../../socket";
import { Alerta } from "../../hooks/useAlert";
import VideoCards from "../../hooks/YouTubeApi.jsx";
import VideoPlayer from "../../Componentes/VideoPlayer.jsx";

export const Host = () => {
  let { Id: Id } = useParams();
  let { Nombre: Nombre } = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [mensaje, setmensaje] = useState("Sin mensaje");
  const [severidad, setseveridad] = useState("info");

  const [listItems, setListItems] = React.useState([]);

  const Buscar = () => {};

  const { onChangeInput, onSubmit, dataForm, setDataForm } = useForm({
    Texto: "",
  });

  const Regresar = () => {
    socket.emit("Eliminar sala", Id);
  };

  const lista = () => {
    VideoListInicial();
  };

  socket.on("Sala Borrada", () => {
    setmensaje("Saliendo de la sala");
    setseveridad("warning");
    setOpen(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  });

  socket.on("NewPeticion" + Id, (data) => {
    setListItems(data);
  });

  return (
    <>
      {Alerta(severidad, mensaje, open, setOpen, 5000)}
      <div className="divInicial">
        <div className="divmini">
          <div
            style={{ width: "100%", top: 10, left: 10, position: "absolute" }}
          >
            <Button
              aria-label="regresar"
              style={{ margin: "5px" }}
              onClick={Regresar}
              variant="contained"
            >
              <ArrowLeftIcon />
            </Button>
            <Button
              aria-label="regresar"
              style={{ margin: "5px" }}
              onClick={lista}
              variant="contained"
            >
              Lista
            </Button>
          </div>

          <span> Ritmo Compartido</span>
          <div className="red-box-mini"></div>
        </div>
        <p>
          Nombre de la Fiesta: {Nombre}
          <br />
          Id de la Fiesta: {Id}
        </p>
        <VideoCards />

        <div>
          <h2>Video Actual</h2>
          
        </div>
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
          <ul>
            {listItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
