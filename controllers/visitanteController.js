const DB = require("../database/index");
const tabela = "visitante";

async function listAll(coluna = "visitante_id", ordem = "ASC") {
  return await DB.execute(
    `SELECT * FROM ${tabela} ORDER BY ${coluna} ${ordem};`
  );
}

async function register(data) {
  try {
    const date = new Date().toISOString().split("T")[0]; //formata a data

    data.visitante_idade = parseInt(data.visitante_idade); //converte de string p/ número
    data.visitante_genero = parseInt(data.visitante_genero);

    const line = await DB.execute(
      `INSERT INTO ${tabela} (visitante_nome, visitante_idade, visitante_profissao, visitante_cidade, visitante_bairro, visitante_genero, visitante_cpf, visitante_data) VALUES ('${data.visitante_nome}', '${data.visitante_idade}', '${data.visitante_profissao}', '${data.visitante_cidade}', '${data.visitante_bairro}', '${data.visitante_genero}', '${data.visitante_cpf}', '${date}');`
    );

    return "mensagem legal";
  } catch (error) {
    return {
      type: "error",
      message: `Erro ao inserir dados: ${error.message}`,
    };
  }
}

module.exports = {
  listAll,
  register,
};
