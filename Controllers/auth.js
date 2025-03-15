const express = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuarios");
const { generateJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = express.response) => {
  const { username, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ where:{username: username} });
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario con ese correo ya existe",
      });
    }
    usuario = new Usuario(req.body);
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    await usuario.save();

    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error,
    });
  }
};

const loginUsuario = async (req, res = express.response) => {
  const { username, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ where:{username: username} });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario NO existe",
      });
    }

    const passwordValid = bcrypt.compareSync(password, usuario.password);
    if (!passwordValid) {
      return res.status(400).json({
        ok: false,
        msg: "El password No es valido",
      });
    }
    const token = await generateJWT(usuario.id, usuario.username);
    res.status(200).json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      error,
    });
  }
};
// const revalidarToken = (req, res = express.response) => {
//   const { uid, username } = req;
//   const token = await(generateJWT(uid, username));
//   res.json({
//     ok: true,
//   });
// };

module.exports = {
  loginUsuario,
  crearUsuario,
  // revalidarToken,
};
