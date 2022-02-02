const { Card } = require("../database/config");

const generateCards = async () => {
  let ids = [];
  try {
    const debitCard = await Card.create({ type: "debit" });
    ids.push(debitCard?.id);
    const creditCard = await Card.create({ type: "credit" });
    ids.push(creditCard?.id);

    return {
      debitCard,
      creditCard,
    };
  } catch (error) {
    console.log(error);
    ids.map((id) =>
      Card.destroy({
        where: {
          id,
        },
      })
    );
    return {
      ok: false,
      msg: "Error al crear las tarjetas",
    };
  }
};

module.exports = { generateCards };
