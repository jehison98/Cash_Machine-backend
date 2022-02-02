const { response } = require("express");
const req = require("express/lib/request");

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateEmail = (req, res = reponse, next) => {
  const { email } = req.body;
  if (email === undefined || !emailRegex.test(email)) {
    return res.status(400).json({ ok: false, msg: "Email no valido" });
  }
  next();
};

const validateName = (req, res = reponse, next) => {
  const { name } = req.body;
  if (name === undefined || name.trim().length < 3) {
    return res.status(400).json({ ok: false, msg: "Nombre no valido" });
  }
  next();
};

const validatePassword = (req, res = reponse, next) => {
  const { password } = req.body;
  if (password === undefined || password.trim().length < 6) {
    return res.status(400).json({
      ok: false,
      msg: "Contraseña muy corta, debe tener minimo 6 caracteres",
    });
  }
  next();
};

module.exports = {
  validateEmail,
  validateName,
  validatePassword,
};
