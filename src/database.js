// Carrega as variáveis salvas no arquivo .env para a memória do Node
require('dotenv').config();
const { createClient } = require('@libsql/client');

// Verifica se as variáveis existem para evitar erros na hora que o professor rodar
if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
  console.error("❌ ERRO: Variáveis TURSO_DATABASE_URL ou TURSO_AUTH_TOKEN não foram configuradas no .env!");
  process.exit(1);
}

// Cria e configura a conexão com o banco de dados distribuído Turso na nuvem
const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

/**
 * Cria a tabela de tarefas na nuvem caso ela ainda não exista no cluster.
 */
async function inicializarBanco() {
  console.log("🔄 Inicializando tabelas no Turso...");
  await client.execute(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      concluida INTEGER DEFAULT 0
    );
  `);
  console.log("✅ Tabela 'tarefas' pronta e verificada!");
}

/**
 * Insere uma nova tarefa no banco de dados Turso.
 * @param {string} titulo - O nome da tarefa
 */
async function adicionarTarefa(titulo) {
  console.log(`➕ Adicionando tarefa: "${titulo}"...`);
  await client.execute({
    sql: "INSERT INTO tarefas (titulo) VALUES (?)",
    args: [titulo]
  });
  console.log("✅ Tarefa gravada com sucesso na nuvem!");
}

/**
 * Busca todas as tarefas salvas no banco em nuvem.
 * @returns {Array} Lista de linhas/tarefas encontradas
 */
async function listarTarefas() {
  console.log("🔍 Buscando dados na nuvem do Turso...");
  const resultado = await client.execute("SELECT * FROM tarefas");
  return resultado.rows;
}

// Exporta as funções para que o arquivo index.js consiga utilizá-las
module.exports = { inicializarBanco, adicionarTarefa, listarTarefas };