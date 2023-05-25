const Router = require("express");
const router = new Router();
const abilityRouter = require("./abilityRouter");
const userRouter = require("./userRouter");
const reposRouter = require("./reposRouter");
const authRouter = require("./authRouter");

router.use("/user", userRouter);
router.use("/ability", abilityRouter);
router.use("/repos", reposRouter);
router.use("/auth", authRouter);

module.exports = router;
