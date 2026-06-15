const { db } = require("\./database");

function adicionarTarefa(titulo) {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO tarefas (titulo) VALUES (?)", [titulo], function(err) {
            if (err) reject(err);
            else resolve({id: this.lastID, titulo, concluida: 0});
        });
    });
}

function listarTarefas() {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM tarefas", [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

module.exports = { adicionarTarefa, listarTarefas };
