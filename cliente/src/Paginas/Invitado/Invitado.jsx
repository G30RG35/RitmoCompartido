import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import { socket } from "../../socket";

export const Invitado = () => {
  let { Id: Id } = useParams();
  let { Pass: Pass } = useParams();

  const [listItems, setListItems] = React.useState([]);

  const handleAddListItem = (text) => {
    const newListItems = [...listItems, text];
    setListItems(newListItems);
  };

  socket.on("NewPeticion" + Id, (data) => {
    setListItems(data)
  });

  useEffect(() => {
    socket.emit("BuscarParty", { Id, Pass });
  }, []);

  function Desconectar() {
    const datos = {
      rol: 1,
      id: Id,
    };
    socket.emit("UsuarioDesconectado", datos);
  }



  const [Nombre, setNombre] = useState("");

  const { onChangeInput, onSubmit, dataForm, setDataForm } = useForm({
    Texto: "",
  });

  const Buscar = () => {
    socket.emit("Peticion", {
      Texto: dataForm.Texto,
      Id: Id,
    });
    setDataForm({
      dataForm,
      Texto: ""
    })
  };

  return (
    <>
      <div className="divInicial">
        <div className="divmini">
          <p> Ritmo Compartido</p>
          <div className="red-box-mini"></div>
        </div>
        <p>
          Nombre de la Fiesta: {Nombre}
          <br />
          Id de la Fiesta: {Id}
        </p>
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
            {listItems.map((item,index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
