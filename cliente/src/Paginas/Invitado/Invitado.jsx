import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import { socket } from "../../socket";

export const Invitado = () => {
  const { Id, Pass } = useParams();
  const [listItems, setListItems] = useState([]);

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

  return (
    <div className="divInicial">
      <div className="divmini">
        <p>Ritmo Compartido</p>
        <div className="red-box-mini"></div>
      </div>
      <p>Nombre de la Fiesta: {Id}</p>
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
            if (event.key === 'Enter') {
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
      </div>
    </div>
  );
};
