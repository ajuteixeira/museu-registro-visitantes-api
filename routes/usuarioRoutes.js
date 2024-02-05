const express = require("express");
const router = express.Router();
const controller = require("../controllers/usuarioController");

router.post("/", async (req, res) => {
  res.send(await controller.login(req.body));
});

module.exports = router;
