const verifyMount = (mount) => {
  if (typeof mount !== "number" || mount <= 0 || mount > 99999999) {
    return {
      ok: false,
      msg: "La cantidad debe ser un numero, no debe ser un valor negativo y debe ser menor a 99999999",
    };
  }
  return true;
};

module.exports = { verifyMount };
