/* 
User routes / account
localhost:PORT/api/account
*/

const { Router } = require("express");
const router = Router();

const {
  withDraw,
  getCards,
  increaseSavings,
  payCard,
} = require("../controllers/account");
const { validateJWT } = require("../middlewares/validate-jwt");

//JWT Validate in all these routes
router.use(validateJWT);

//Account Routes
router.get(
  "/",
  //Controller
  getCards
);
router.put(
  "/withdraw",
  //Controller
  withDraw
);
router.put(
  "/save",
  //Controller
  increaseSavings
);
router.put(
  "/pay",
  //Controller
  payCard
);

module.exports = router;
