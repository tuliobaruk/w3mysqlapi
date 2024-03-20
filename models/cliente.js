module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("cliente", {
        nome: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(100),
        },
        endereco: {
            type: Sequelize.STRING
        },
        telefone: {
            type: Sequelize.STRING(20)
        }
    });
    Cliente.associate = function (models) {
        Cliente.hasMany(models.pedido);
      };
    return Cliente
  };