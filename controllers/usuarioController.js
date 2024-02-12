const DB = require("../database/index");
const tabela = "usuario";

async function login(data) {
  try {
    if (!data.usuario_email) {
      throw new Error("Email é o obrigatório");
    }
    if (!data.usuario_senha) {
      throw new Error("Senha é obrigatória");
    }

    const result = await DB.execute(
      `SELECT usuario_id FROM ${tabela} WHERE usuario_email = '${data.usuario_email}' AND usuario_senha = '${data.usuario_senha}';`
    );
    const response =
      result.length > 0 ? "success" : "Email ou senha estão incorretos";
    return response;
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  login,
};
