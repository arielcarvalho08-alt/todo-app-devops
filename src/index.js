require('dotenv').config();
const express = require('express');
const path = require('path');
const { inicializarBanco, adicionarTarefa, listarTarefas, concluirTarefa } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// 1. Rota de Listagem (GET)
app.get('/api/tarefas', async (req, res) => {
  try {
    const tarefas = await listarTarefas();
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
});

// 2. Rota de Cadastro (POST)
app.post('/api/tarefas', async (req, res) => {
  try {
    const { titulo } = req.body;
    await adicionarTarefa(titulo);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Rota de Conclusão (PATCH)
app.patch('/api/tarefas/:id/concluir', async (req, res) => {
  try {
    const { id } = req.params;
    await concluirTarefa(Number(id));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function iniciarServidor() {
  try {
    await inicializarBanco();
    app.listen(PORT, () => {
      console.log(`🚀 Servidor Express HTTP ativo na porta ${PORT}`);
    });
  } catch (erro) {
    console.error("Falha crítica ao iniciar o servidor:", erro.message);
  }
}

iniciarServidor();