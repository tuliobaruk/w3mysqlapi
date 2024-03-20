module.exports = (sequelize, Sequelize) => {
    const Pedido = sequelize.define("pedido", {
        status: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        data_pedido: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });
    Pedido.associate = function (models) {
        Pedido.belongsTo(models.cliente);
      };
    return Pedido;
}