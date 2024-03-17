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
        console.error(`Erro ao conectar ao banco de dados: ${err.message}`);
    } else {
        console.log('Conectado ao MySQL');
    }
});

// ==================================================//
// Endpoints de Categorias
// ==================================================//

app.post('/categorias', (req, res) => {
    const { nome, descricao } = req.body;
    const sql = 'INSERT INTO Categorias (nome, descricao) VALUES (?, ?)';
    connection.query(sql, [nome, descricao], (err, results) => {
        if (err) {
            res.status(500).send({ message: `Erro ao adicionar categoria: ${err.message}` });
            return;
        }
        res.status(201).send(`Categoria adicionada com ID: ${results.insertId}`);
    });
});

app.get('/categorias', (req, res) => {
    const sql = 'SELECT * FROM Categorias';
    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).send({ message: `Erro ao buscar categorias: ${err.message}` });
            return;
        }
        res.json(results);
    });
});

app.get('/categorias/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Categorias WHERE id = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).send({ message: `Erro ao buscar categoria com ID ${id}: ${err.message}` });
            return;
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('Categoria não encontrada.');
        }
    });
});

app.put('/categorias/:id', (req, res) => {
    const { nome, descricao } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE Categorias SET nome = ?, descricao = ? WHERE id = ?';
    connection.query(sql, [nome, descricao, id], (err, results) => {
        if (err) {
            res.status(500).send({ message: `Erro ao atualizar categoria com ID ${id}: ${err.message}` });
            return;
        }
        res.send('Categoria atualizada com sucesso.');
    });
});

app.delete('/categorias/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Categorias WHERE id = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).send({ message: `Erro ao deletar categoria com ID ${id}: ${err.message}` });
            return;
        }
        res.send('Categoria deletada com sucesso.');
    });
});

// ==================================================//
// Endpoints de Produtos
// ==================================================//

app.post('/produtos', (req, res) => {
    const { nome, descricao, preco, id_categoria, disponivel } = req.body;
    const sql = 'INSERT INTO Produtos (nome, descricao, preco, id_categoria, disponivel) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [nome, descricao, preco, id_categoria, disponivel], (err, results) => {
        if (err) {
            res.status(500).send({ message: `Erro ao adicionar produto: ${err.message}` });
            return;
        }
        res.status(201).send(`Produto adicionado com ID: ${results.insertId}`);
    });
});

app.get('/produtos', (req, res) => {
    const sql = 'SELECT * FROM Produtos';
    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).send({ message: `Erro ao buscar produtos: ${err.message}` });
            return;
        }
        res.json(results);
    });
});

app.get('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Produtos WHERE id = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).send({ message: `Erro ao buscar produto com ID ${id}: ${err.message}` });
            return;
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('Produto não encontrado.');
        }
    });
});

app.put('/produtos/:id', (req, res) => {
    const { nome, descricao, preco, id_categoria, disponivel } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE Produtos SET nome = ?, descricao = ?, preco = ?, id_categoria = ?, disponivel = ? WHERE id = ?';
    connection.query(sql, [nome, descricao, preco, id_categoria, disponivel, id], (err) => {
        if (err) {
            res.status(500).send({ message: `Erro ao atualizar produto com ID ${id}: ${err.message}` });
            return;
        }
        res.send('Produto atualizado com sucesso.');
    });
});

app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Produtos WHERE id = ?';
    connection.query(sql, [id], (err) => {
        if (err) {
            res.status(500).send({ message: `Erro ao deletar produto com ID ${id}: ${err.message}` });
            return;
        }
        res.send('Produto deletado com sucesso.');
    });
});

// ==================================================//
// Endpoints de Clientes
// ==================================================//

app.post('/clientes', (req, res) => {
    const { nome, email, endereco, telefone } = req.body;
    const sql = 'INSERT INTO Clientes (nome, email, endereco, telefone) VALUES (?, ?, ?, ?)';
    connection.query(sql, [nome, email, endereco, telefone], (err, results) => {
        if (err) {
            res.status(500).send({ message: `Erro ao adicionar cliente: ${err.message}` });
            return;
        }
        res.status(201).send(`Cliente adicionado com ID: ${results.insertId}`);
    });
});

app.get('/clientes', (req, res) => {
    const sql = 'SELECT * FROM Clientes';
    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).send({ message: `Erro ao buscar clientes: ${err.message}` });
            return;
        }
        res.json(results);
    });
});

app.get('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Clientes WHERE id = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).send({ message: `Erro ao buscar cliente com ID ${id}: ${err.message}` });
            return;
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('Cliente não encontrado.');
        }
    });
});

app.put('/clientes/:id', (req, res) => {
    const { nome, email, endereco, telefone } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE Clientes SET nome = ?, email = ?, endereco = ?, telefone = ? WHERE id = ?';
    connection.query(sql, [nome, email, endereco, telefone, id], (err) => {
        if (err) {
            res.status(500).send({ message: `Erro ao atualizar cliente com ID ${id}: ${err.message}` });
            return;
        }
        res.send('Cliente atualizado com sucesso.');
    });
});

app.delete('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Clientes WHERE id = ?';
    connection.query(sql, [id], (err) => {
        if (err) {
            res.status(500).send({ message: `Erro ao deletar cliente com ID ${id}: ${err.message}` });
            return;
        }
        res.send('Cliente deletado com sucesso.');
    });
});

// ==================================================//
// Endpoints de Pedidos
// ==================================================//

app.post('/pedidos', (req, res) => {
    const { id_cliente, data_pedido, status } = req.body;
    const sql = 'INSERT INTO Pedidos (id_cliente, data_pedido, status) VALUES (?, ?, ?)';
    connection.query(sql, [id_cliente, data_pedido, status], (err, results) => {
        if (err) {
            res.status(500).send({ message: `Erro ao adicionar pedido: ${err.message}` });
            return;
        }
        res.status(201).send(`Pedido adicionado com ID: ${results.insertId}`);
    });
});

app.get('/pedidos', (req, res) => {
    const sql = 'SELECT * FROM Pedidos';
    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).send({ message: `Erro ao buscar pedidos: ${err.message}` });
            return;
        }
        res.json(results);
    });
});

app.get('/pedidos/:id/itens', (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT ItensPedido.*, Produtos.nome AS nome_produto, Produtos.descricao, Produtos.preco
        FROM ItensPedido
        INNER JOIN Produtos ON ItensPedido.id_produto = Produtos.id
        WHERE ItensPedido.id_pedido = ?
    `;
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).send({ message: `Erro ao buscar itens do pedido com ID ${id}: ${err.message}` });
            return;
        }
        if (results.length > 0) {
            res.json(results);
        } else {
            res.status(404).send('Nenhum item encontrado para este pedido.');
        }
    });
});

app.get('/pedidos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Pedidos WHERE id = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).send({ message: `Erro ao buscar pedido com ID ${id}: ${err.message}` });
            return;
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('Pedido não encontrado.');
        }
    });
});

app.put('/pedidos/:id', (req, res) => {
    const { id_cliente, data_pedido, status } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE Pedidos SET id_cliente = ?, data_pedido = ?, status = ? WHERE id = ?';
    connection.query(sql, [id_cliente, data_pedido, status, id], (err) => {
        if (err) {
            res.status(500).send({ message: `Erro ao atualizar pedido com ID ${id}: ${err.message}` });
            return;
        }
        res.send('Pedido atualizado com sucesso.');
    });
});

app.delete('/pedidos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Pedidos WHERE id = ?';
    connection.query(sql, [id], (err) => {
        if (err) {
            res.status(500).send({ message: `Erro ao deletar pedido com ID ${id}: ${err.message}` });
            return;
        }
        res.send('Pedido deletado com sucesso.');
    });
});

// ==================================================//
// Endpoints de ItensPedido
// ==================================================//

app.post('/itenspedido', (req, res) => {
    const { id_pedido, id_produto, quantidade, preco_unitario } = req.body;
    const sql = 'INSERT INTO ItensPedido (id_pedido, id_produto, quantidade, preco_unitario) VALUES (?, ?, ?, ?)';
    connection.query(sql, [id_pedido, id_produto, quantidade, preco_unitario], (err, results) => {
        if (err) {
            res.status(500).send({ message: `Erro ao adicionar item de pedido: ${err.message}` });
            return;
        }
        res.status(201).send(`Item de pedido adicionado com ID: ${results.insertId}`);
    });
});

app.get('/itenspedido', (req, res) => {
    const sql = 'SELECT * FROM ItensPedido';
    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).send({ message: `Erro ao buscar itens de pedido: ${err.message}` });
            return;
        }
        res.json(results);
    });
});

app.get('/itenspedido/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM ItensPedido WHERE id = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) {
            res.status(500).send({ message: `Erro ao buscar item de pedido com ID ${id}: ${err.message}` });
            return;
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('Item de pedido não encontrado.');
        }
    });
});

app.put('/itenspedido/:id', (req, res) => {
    const { id_pedido, id_produto, quantidade, preco_unitario } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE ItensPedido SET id_pedido = ?, id_produto = ?, quantidade = ?, preco_unitario = ? WHERE id = ?';
    connection.query(sql, [id_pedido, id_produto, quantidade, preco_unitario, id], (err) => {
        if (err) {
            res.status(500).send({ message: `Erro ao atualizar item de pedido com ID ${id}: ${err.message}` });
            return;
        }
        res.send('Item de pedido atualizado com sucesso.');
    });
});

app.delete('/itenspedido/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM ItensPedido WHERE id = ?';
    connection.query(sql, [id], (err) => {
        if (err) {
            res.status(500).send({ message: `Erro ao deletar item de pedido com ID ${id}: ${err.message}` });
            return;
        }
        res.send('Item de pedido deletado com sucesso.');
    });
});

// Inicializando
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
