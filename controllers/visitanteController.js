const DB = require("../database/index");
const tabela = "visitante";

async function listar(coluna = "visitante_id", ordem = "ASC") {
  return await DB.execute(
    `SELECT * FROM ${tabela} ORDER BY ${coluna} ${ordem};`
  );
}

async function cadastrar(data) {
  try {
    const linha = await DB.execute(
      `INSERT INTO ${tabela} (visitante_nome, visitante_idade, visitante_profissao, visitante_cidade, visitante_bairro, visitante_genero, visitante_cpf) VALUES ('${data.visitante_nome}', '${data.visitante_idade}', '${data.visitante_profissao}', '${data.visitante_cidade}', '${data.visitante_bairro}', '${data.visitante_genero}', '${data.visitante_cpf}');`
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
  listar,
  cadastrar,
};
