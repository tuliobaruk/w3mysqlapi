module.exports = (sequelize, Sequelize) => {
    const Produto = sequelize.define("produto", {
        nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      preco: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      disponivel: {
        type: Sequelize.BOOLEAN
      }
    });
    Produto.associate = function (models) {
        Produto.belongsTo(models.categoria);
      };
    return Produto;
  };