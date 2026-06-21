require('dotenv').config();
const express = require('express');
const path = require('path');
const { inicializarBanco, adicionarTarefa, listarTarefas } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/tarefas', async (req, res) => {
  try {
    const tarefas = await listarTarefas();
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
});

app.post('/api/tarefas', async (req, res) => {
  try {
    const { titulo } = req.body;
    await adicionarTarefa(titulo);
    res.status(201).json({ success: true });
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