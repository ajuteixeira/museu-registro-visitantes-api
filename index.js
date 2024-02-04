const express = require("express");
const cors = require("cors");

const usuarioRoutes = require("./routes/usuarioRoutes");
const visitanteRoutes = require("./routes/visitanteRoutes");

const app = express();
const port = 8001;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Bem-vindo à API do museu");
});

app.use("/login", usuarioRoutes);
app.use("/visitantes", visitanteRoutes);

app.all("*", (req, res) => {
  res.status(404).send("Rota não encontrada");
});

app.listen(port, () => {
  console.log(`Servidor de pé na url: http://localhost:${port}`);
});
