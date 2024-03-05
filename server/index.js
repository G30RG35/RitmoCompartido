const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('RitmoCompartido');
});

app.listen(5173, () => {
  console.log('Servidor escuchando en el puerto 5173');
});
