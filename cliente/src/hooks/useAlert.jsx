import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
/**
 * Componente para mostrar una alerta mediante un Snackbar.
 *
 * @param {string} severidad - Severidad de la alerta (p. ej., "success", "error", "warning", "info").
 * @param {string} mensaje - Mensaje que se mostrará en la alerta.
 * @param {boolean} open - Estado de apertura de la alerta.
 * @param {function} setOpen - Función para establecer el estado de apertura de la alerta.
 * @returns {JSX.Element} - Elemento JSX que representa la alerta.
 */
export const Alerta = (severidad, mensaje, open, setOpen, time =5000,aling="center") => {
  /**
   * Componente Alert personalizado utilizando MuiAlert de Material-UI.
   *
   * @param {object} props - Propiedades del componente Alert.
   * @param {React.Ref} ref - Referencia al componente.
   * @returns {JSX.Element} - Elemento JSX que representa el componente Alert personalizado.
   */
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  /**
   * Función para cerrar la Snackbar al hacer clic fuera o al expirar el tiempo de auto-ocultar.
   *
   * @param {Event} event - Evento del cierre.
   * @param {string} reason - Razón del cierre.
   */
  //mensajes


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Estado local para la configuración de la Snackbar (posición)
  const [snackbarState, setSnackbarState] = useState({
    vertical: "top",
    horizontal: aling,
  });

  // Desestructura la configuración de la Snackbar
  const { vertical, horizontal } = snackbarState;

  // Renderiza el componente Snackbar con el componente Alert dentro
  return (
    <Snackbar
      open={open}
      autoHideDuration={time} // Duración en milisegundos antes de auto-ocultar
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }} // Posición de la Snackbar
      key={vertical + horizontal}
    >
      <Alert onClose={handleClose} severity={severidad} sx={{ width: "100%" }}>
        {mensaje}
      </Alert>
    </Snackbar>
  );
};
