const express = require("express");
const cors = require("cors");

const app = express();
const port = 8001;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Bem-vindo à API do museu");
});

app.listen(port, () => {
  console.log(`Servidor de pé na url: http://localhost:${port}`);
});
