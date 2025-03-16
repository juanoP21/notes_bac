const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-token");
const Usuario = require("../models/Usuarios");

Usuario.sync();
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../Controllers/auth");
const { validarCampos } = require("../middlewares/validator-campos");

router.post("/login", loginUsuario);

router.post(
  "/new",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  crearUsuario
);
 router.get("/verificar", validarJWT, revalidarToken);

module.exports = router;
