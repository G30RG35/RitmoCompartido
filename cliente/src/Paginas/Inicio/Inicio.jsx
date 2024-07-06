import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Inicio = () => {
  const navigate = useNavigate();

  function Crear() {
    navigate("/crear-party");
  }

  function Unirse() {
    navigate("/unirse-party");
  }

  return (
    <>
      <div className="divInicial">
        <p>Ritmo Compartido</p>
        <div className="red-box"></div>
        <Button onClick={Crear} variant="contained" color="black">
          Crear Party
        </Button>
        <Button onClick={Unirse} variant="contained" color="black">
          Unirse a Party
        </Button>
      </div>
    </>
  );
};
