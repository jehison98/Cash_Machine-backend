const { response } = require("express");
const { Card } = require("../database/config");

const { getUserCards, getUserCard } = require("../helpers/getUserCards");
const { verifyMount } = require("../helpers/verifyMount");

const getCards = async (req, res = response) => {
  const userId = req.id;

  try {
    const allCards = await getUserCards(userId);
    res
      .status(200)
      .json({ ok: true, msg: "Solicitud recibida con exito", allCards });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const withDraw = async (req, res = response) => {
  const { withDrawMount, cardType } = req.body;
  const userId = req.id;

  const verify = verifyMount(withDrawMount);
  if (verify !== true) {
    return res.status(400).json(verify);
  }

  try {
    const card = await getUserCard(userId, cardType);
    const cardMount = parseFloat(card.mount);
    let newMount;

    switch (card.type) {
      case "debit":
        if (cardMount >= withDrawMount) {
          newMount = cardMount - withDrawMount;
        } else {
          return res.status(400).json({
            ok: false,
            msg: `Saldo insuficiente. Tu saldo actual es de $${cardMount}`,
          });
        }
        break;
      case "credit":
        if (cardMount >= withDrawMount * 1.05) {
          newMount = cardMount - withDrawMount * 1.05;
        } else {
          return res.status(400).json({
            ok: false,
            msg: `Saldo insuficiente. Tu saldo actual es de ${cardMount}. Recuerda que en retiros de credito se cobra un 5% de comision`,
          });
        }
        break;

      default:
        return res.status(500).json({
          ok: false,
          msg: "Por favor hable con el administrador",
        });
    }

    const roundedMount = Math.round(newMount * 100) / 100;
    await Card.update({ mount: roundedMount }, { where: { id: card.id } });
    res.status(200).json({
      ok: true,
      msg: `Tu retiro de $${withDrawMount} fue exitoso. Tu saldo actual es de $${roundedMount}`,
      cardBalance: roundedMount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const increaseSavings = async (req, res = response) => {
  const { increaseMount } = req.body;
  const userId = req.id;

  const verify = verifyMount(increaseMount);
  if (verify !== true) {
    return res.status(400).json(verify);
  }

  try {
    const card = await getUserCard(userId, "debit");
    const cardMount = parseFloat(card.mount);
    if (cardMount + increaseMount > 99999999) {
      return res.status(400).json({
        ok: false,
        msg: "Solo puedes tener un maximo de $99999999 en tu cuenta de ahorro",
      });
    }
    const newMount = Math.round((cardMount + increaseMount) * 100) / 100;
    await Card.update({ mount: newMount }, { where: { id: card.id } });
    res.status(200).json({
      ok: true,
      msg: `Deposito exitoso. Tu saldo actual es de ${newMount}`,
      debitBalance: newMount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const payCard = async (req, res = response) => {
  const { payMount } = req.body;
  const userId = req.id;

  const verify = verifyMount(payMount);
  if (verify !== true) {
    return res.status(400).json(verify);
  }

  try {
    const creditCard = await getUserCard(userId, "credit");
    const debitCard = await getUserCard(userId, "debit");

    const creditMout = parseFloat(creditCard.mount);
    const debitMount = parseFloat(debitCard.mount);

    if (creditMout === 2000) {
      return res
        .status(400)
        .send({ ok: false, msg: "Tu cuenta de credito esta al corriente" });
    } else if (debitMount < payMount) {
      return res.status(400).send({
        ok: false,
        msg: "Tu cuenta de debito no tiene suficiente saldo para pagar la deuda de tu credito",
      });
    } else if (creditMout + payMount > 2000) {
      return res.status(400).send({
        ok: false,
        msg: `Estas depositando una cantidad mas grande que tu adedudo. Tu adeudo es de $${
          2000 - creditMout
        }`,
      });
    }

    const roundDebit = Math.round((debitMount - payMount) * 100) / 100;
    const roundCredit = Math.round((creditMout + payMount) * 100) / 100;
    await Card.update({ mount: roundDebit }, { where: { id: debitCard.id } });
    await Card.update({ mount: roundCredit }, { where: { id: creditCard.id } });
    res.status(200).json({
      ok: true,
      msg: `Deposito exitoso. Tu credito disponible es de $${roundCredit}. Tu saldo en tu cuenta de debito es de $${roundDebit}`,
      creditBalance: roundCredit,
      debitBalance: roundDebit,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

module.exports = { withDraw, getCards, increaseSavings, payCard };
