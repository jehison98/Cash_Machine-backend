const { Router } = require("express");
const router = Router();

// Import the routers;
const auth = require("./authRouter");
const account = require("./accountRouter");

// Config the routers
// Example: router.use('/auth', authRouter);
router.use("/auth", auth);
router.use("/account", account);

module.exports = router;
