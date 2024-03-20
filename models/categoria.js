module.exports = (sequelize, Sequelize) => {
    const Categoria = sequelize.define("categoria", {
        nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: false,
      }
    });
    Categoria.associate = function (models) {
      Categoria.hasMany(models.produto);
    };
    return Categoria;
  };