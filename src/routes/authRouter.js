/* 
User routes / Auth
localhost:PORT/api/auth
*/

const { Router } = require("express");

const {
  createUser,
  revalidateToken,
  loginUser,
} = require("../controllers/auth");
const {
  validateEmail,
  validateName,
  validatePassword,
} = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

//Auth Routes
router.post(
  "/new",
  //Middlewares
  [validateEmail, validateName, validatePassword],
  //Controller
  createUser
);
router.post("/", /*Middleware*/ validateEmail, loginUser);
router.get("/renew", /*Middleware*/ validateJWT, revalidateToken);

module.exports = router;
