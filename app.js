const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'appmysql'
});

connection.connect((err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Conectado ao MySQL');
    }
});

app.post('/users', (req, res) => {
    const { email, senha } = req.body;
    const query = 'INSERT INTO users (email, senha) VALUES (?, ?)';
    connection.query(query, [email, senha], (err, result) => {
        if (err) {
            console.error('Erro ao inserir registro:', err.message);
            res.status(500).json({ error: 'Erro ao inserir registro no banco de dados' });
        } else {
            console.log('Registro inserido com sucesso!');
            res.status(201).json({ message: 'Registro adicionado com sucesso' });
        }
    });
});

app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao obter registros:', err.message);
            res.status(500).json({ error: 'Erro ao obter registros do banco de dados' });
        } else {
            res.status(200).json(results);
        }
    });
});

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { email, senha } = req.body;
    const query = 'UPDATE users SET email = ?, senha = ? WHERE id = ?';
    connection.query(query, [email, senha, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar registro:', err.message);
            res.status(500).json({ error: 'Erro ao atualizar registro no banco de dados' });
        } else {
            console.log('Registro atualizado com sucesso!');
            res.status(200).json({ message: 'Registro atualizado com sucesso' });
        }
    });
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erro ao excluir registro:', err.message);
            res.status(500).json({ error: 'Erro ao excluir registro no banco de dados' });
        } else {
            if (result.affectedRows > 0) {
                console.log('Registro excluído com sucesso!');
                res.status(200).json({ message: 'Registro excluído com sucesso' });
            } else {
                console.log('Registro não encontrado.');
                res.status(404).json({ message: 'Nenhum registro encontrado para excluir' });
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
