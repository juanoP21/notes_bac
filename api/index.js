const serverless = require("serverless-http");
const app = require("../index.js"); // Asegúrate de que la ruta sea correcta

module.exports.handler = serverless(app);
