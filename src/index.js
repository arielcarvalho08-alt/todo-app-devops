const { inicializarBanco, adicionarTarefa, listarTarefas } = require('./database');

async function rodarAplicacao() {
  console.log("\n=========================================");
  console.log("🚀 INICIANDO TESTE DO TODO-APP (DEVOPS) ");
  console.log("=========================================\n");

  try {
    // 1. Garante que a estrutura do banco na nuvem existe
    await inicializarBanco();
    
    // 2. Adiciona uma tarefa dinamicamente para mostrar que o INSERT funciona
    const timestamp = new Date().toLocaleTimeString();
    await adicionarTarefa(`Apresentar Checkpoint 2 às ${timestamp}`);
    
    // 3. Consulta o banco na nuvem e puxa a lista atualizada
    const tarefas = await listarTarefas();
    
    console.log("\n📥 === LISTA DE TAREFAS ATUAIS (DIRETO DA NUVEM) ===");
    console.log(JSON.stringify(tarefas, null, 2));
    console.log("====================================================\n");
    
    console.log("🎉 Teste executado com sucesso! Conexão 100% funcional.");
    
  } catch (erro) {
    console.error("\n❌ Ocorreu um erro crítico durante a execução:");
    console.error(erro.message);
    console.error("====================================================\n");
  }
}

// Executa o script
rodarAplicacao();