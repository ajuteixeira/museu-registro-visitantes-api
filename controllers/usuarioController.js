const DB = require("../database/index");
const tabela = "usuario";

async function logar(data) {
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
    if (result.length > 0) {
      return "deu bommm";
    } else {
      return {
        type: "warning",
        message: "Email ou senha estão incorretos",
      };
    }
  } catch (error) {
    return {
      type: "error",
      message: error.message,
    };
  }
}

module.exports = {
  logar,
};
