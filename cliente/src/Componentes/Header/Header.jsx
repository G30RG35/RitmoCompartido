import React from "react";
import "../../index.css";
import { Grid } from "@mui/material";
import ArrowLeftIcon from "@heroicons/react/24/outline/ArrowLeftIcon";
import logo from "/LogoP.png";

export const Header = ({ Id, Nombre }) => {
  const Regresar = () => {
    socket.emit("EliminarSala", { Id });
  };

  return (
    <div className="header">
      <Grid container>
        {/* Atras */}
        <Grid item xs={3} className="center">
          <ArrowLeftIcon onClick={Regresar} style={{ height: "2rem" }} />
        </Grid>
        {/* Titulo */}
        <Grid item xs={6} className="center">
          <span>{Nombre}</span>
        </Grid>
        {/* Perfil */}
        <Grid item xs={3} className="center">
          <div className="div_logo_header">
            <img src={logo} className="logo_Header" />
            <span>{Id}</span>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
