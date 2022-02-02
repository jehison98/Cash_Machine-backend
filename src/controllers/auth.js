const { response } = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("../database/config");
const { generateJWT } = require("../helpers/jwt");
const { generateCards } = require("../helpers/newCards");

const createUser = async (req, res = response) => {
  const { email, password, name } = req.body;

  try {
    //Verify if user exists
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario ya existe con ese correo",
      });
    }
    user = User.build({ name, email, password });

    //Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    //Generate Cards
    const { debitCard, creditCard } = await generateCards();
    //Associate user and cards
    user.addCard(debitCard.id);
    user.addCard(creditCard.id);

    //Generate JWT
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      id: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    User.destroy({
      where: {
        email,
      },
    });
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //Verify if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe",
      });
    }

    //Confirm password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña incorrecto",
      });
    }

    //Generate JWT
    const token = await generateJWT(user.id, user.name);
    res.json({
      ok: true,
      id: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Porfavor hable con el admin",
    });
  }
};

const revalidateToken = async (req, res = response) => {
  const { id, name } = req;

  //Generar nuevo token
  const token = await generateJWT(id, name);

  res.json({
    ok: true,
    id,
    name,
    token,
  });
};

module.exports = {
  createUser,
  loginUser,
  revalidateToken,
};
