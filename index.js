const express = require('express')

const db = require("./models");
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Olá Mundo!')
  })

db.sequelize.sync({ force: true }).then(function () {
  app.listen(port, function () {
    console.log("O Sequelize está funcionando\nO Servidor express está funcionando");
  });
});