const { inicializarBanco } = require("./database");
const { adicionarTarefa, listarTarefas } = require("./tarefas");

async function main() {
    await inicializarBanco();
    await adicionarTarefa("Estudar para o checkpoint de DevOps");

    console.log("=== LISTA DE TAREFAS ATUAIS ===");
    const tarefas = await listarTarefas();
    console.log(tarefas);
}

main().catch(console.error);