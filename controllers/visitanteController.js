const DB = require("../database/index");
const tabela = "visitante";

async function listAll(coluna = "visitante_id", ordem = "ASC") {
  const results = await DB.execute(
    `SELECT * FROM ${tabela} ORDER BY ${coluna} ${ordem};`
  );

  return results.map((record) => parseRecord(record));
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

function parseRecord(record) {
  const parsedRecord = {};

  Object.keys(record).forEach((field) => {
    parsedRecord[field] = parseFieldValue(field, record[field]);
  });

  return parsedRecord;
}

function parseFieldValue(key, value) {
  switch (key) {
    case "visitante_genero":
      return formatGenre(value);
      break;
    case "visitante_data":
      return formatDate(value);
      break;
    default:
      return value;
  }
}

//formata o gênero para exibição no gráfico
function formatGenre(value) {
  return value === 1 ? "Masculino" : "Feminino";
}

//seleciona apenas o mês da data e escreve por extenso
function formatDate(value) {
  const date = new Date(value);
  const month = date.getMonth();
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  return monthNames[month];
}

module.exports = {
  listAll,
  register,
};
