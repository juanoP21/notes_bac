// const { Sequelize, Model, DataTypes } = require("sequelize");
const { validarJWT } = require("./middlewares/validar-token");

const express = require("express");
require("dotenv").config();
const cors = require("cors");
//Crear express app
const app = express();


app.use(express.static("public"));
app.use(cors());
const bodyParser = require("body-parser");

// create application/json parser

//Rutas
app.use(bodyParser.json());

app.use("/api/auth", require("./Routes/auth.js"));
app.use("/api/",validarJWT, require("./Routes/route_note.js"));

//Escuchar en puerto 4000
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
