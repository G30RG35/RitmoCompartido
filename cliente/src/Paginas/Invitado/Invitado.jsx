import { Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import { socket } from "../../socket";
import ArrowLeftIcon from "@heroicons/react/24/outline/ArrowLeftIcon";
import { Header } from "../../Componentes/Header/Header";
import "../../index.css";
import VideoCard from "../../Componentes/VideoCard/VideoCard";

export const Invitado = () => {
  const { Id, Pass, Nombre } = useParams();
  const [listItems, setListItems] = useState([]);
  const [sinVideo, setSinVideo] = useState(true);

  useEffect(() => {
    socket.emit("BuscarParty", { Id, Pass });

    const handlePeticionesActualizadas = (data) => {
      const textArray = data.map((petition) => petition.Texto);
      setListItems(textArray);
    };

    socket.on("PeticionesActualizadas", handlePeticionesActualizadas);

    return () => {
      socket.off("PeticionesActualizadas", handlePeticionesActualizadas);
    };
  }, [Id, Pass]);

  const { onChangeInput, dataForm, setDataForm } = useForm({
    Texto: "",
  });

  const Buscar = () => {
    socket.emit("Peticion", { Texto: dataForm.Texto, Id });
    setDataForm({ Texto: "" });
  };

  const Regresar = () => {
    socket.emit("EliminarSala", { Id });
  };

  return (
    <>
      <Header Id={Id} Nombre={Nombre} />

      <div className="div_body">
        <span style={{ fontWeight: "900" }}>Video Actual</span>
      </div>

      {sinVideo ? "Sin video" : (
        <VideoCard dataSearch={dataSearch} addVideoList={addVideoList} />
      )}

      {/* <p>Nombre de la Fiesta: {Id}</p>
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
        <div>
          <p>Canciones pedidas</p>
          <ul>
            {listItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div> */}
    </>
  );
};
