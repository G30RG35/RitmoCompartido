import { Button, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import ArrowLeftIcon from "@heroicons/react/24/outline/ArrowLeftIcon";
import { socket } from "../../socket";
import { Alerta } from "../../hooks/useAlert";
import VideoCard from "../../Componentes/VideoCard/VideoCard.jsx";
import { busqueda } from "../../hooks/PeticionesApi.js";
import { Video } from "../../Componentes/Video/Video.jsx";

export const Host = () => {
  let { Id: Id } = useParams();
  let { Nombre: Nombre } = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [mensaje, setmensaje] = useState("Sin mensaje");
  const [severidad, setseveridad] = useState("info");

  const [listItems, setListItems] = React.useState([]);

  const [videoList, setvideoList] = useState([]);
  const [firstSearch, setfirstSearch] = useState(false);
  const [dataSearch, setdataSearch] = useState(null);

  const addVideoList = (id,videoid) => {
    console.log(id)
    console.log(videoid)
    let nuevoid=""
    if (videoid!=null) {
      nuevoid=videoid
    }else{
      nuevoid=id
    }

    console.log("video agreado");
    setvideoList((prevVideoList) => [...prevVideoList, nuevoid]);
  };

  const { onChangeInput, onSubmit, dataForm, setDataForm } = useForm({
    Texto: "",
  });

  const Buscar = async () => {
    const resp = await busqueda(dataForm.Texto);
    setdataSearch(resp);
    console.log("repuesta en el host", resp);
    setfirstSearch(true);
  };

  useEffect(() => {
    console.log(dataSearch);
  }, [dataSearch]);

  const Regresar = () => {
    socket.emit("Eliminar sala", Id);
  };

  const lista = () => {
    console.log(videoList);
  };

  socket.on("Sala Borrada", () => {
    setmensaje("Saliendo de la sala");
    setseveridad("warning");
    setOpen(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  });

  socket.on("PeticionesActualizadas" + Id, (data) => {
    const textArray = data.map((petition) => petition.Texto);
    setListItems(textArray)
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
        {firstSearch ? (
          <VideoCard dataSearch={dataSearch} addVideoList={addVideoList} />
        ) : (
          <>
            <h3>Tendencias</h3>
            <VideoCard addVideoList={addVideoList} />
          </>
        )}
        <div>
          <h2>Video Actual</h2>
          <Video videoList={videoList}/>
        </div>

        {/* Buscador */}
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
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                Buscar();
              }
            }}
          />
          <Button
            style={{ margin: "5px" }}
            onClick={Buscar}
            variant="contained"
          >
            <MagnifyingGlassIcon />
          </Button>
        </div>

        {/* Canciones Pedidas */}
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
