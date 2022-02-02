const { User, Card } = require("../database/config");

const getUserCards = async (userId) => {
  try {
    const userCards = await User.findByPk(userId, {
      include: { model: Card },
    });

    const allCards = userCards.cards.map((card) => {
      return { id: card.id, type: card.type, mount: card.mount };
    });

    return allCards;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error en la base de datos",
    });
  }
};

const getUserCard = async (userId, cardType) => {
  try {
    const userCard = await User.findByPk(userId, {
      include: { model: Card, where: { type: cardType } },
    });

    const { id, type, mount } = userCard.cards[0];

    return { id, type, mount };
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error en la base de datos",
    });
  }
};

module.exports = { getUserCards, getUserCard };
