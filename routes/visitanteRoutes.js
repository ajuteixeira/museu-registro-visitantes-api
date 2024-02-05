const express = require("express");
const router = express.Router();
const controller = require("../controllers/visitanteController");

router.get("/", async (req, res) => {
  res.send(await controller.listAll());
});

router.post("/", async (req, res) => {
  res.send(await controller.register(req.body));
});

module.exports = router;
