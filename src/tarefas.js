// Importa as funções corretas e seguras do seu arquivo database.js
const { adicionarTarefa, listarTarefas } = require('./database');

/**
 * Insere uma nova tarefa utilizando a estrutura atualizada do Turso.
 * @param {string} titulo - O nome da tarefa
 */
async function adicionarTarefaService(titulo) {
    try {
        await adicionarTarefa(titulo);
        // Retorna a estrutura que o resto do seu app espera receber
        return { id: Date.now(), titulo, concluida: 0 };
    } catch (err) {
        throw err;
    }
}

/**
 * Busca todas as tarefas utilizando a estrutura atualizada do Turso.
 */
async function listarTarefasService() {
    try {
        const rows = await listarTarefas();
        return rows;
    } catch (err) {
        throw err;
    }
}

module.exports = { 
    adicionarTarefa: adicionarTarefaService, 
    listarTarefas: listarTarefasService 
};