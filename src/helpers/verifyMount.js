const verifyMount = (mount) => {
  if (typeof mount !== "number" || mount <= 0) {
    return {
      ok: false,
      msg: "La cantidad debe ser un numero y no debe ser un valor negativo",
    };
  }
  return true;
};

module.exports = { verifyMount };
