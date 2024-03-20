module.exports = (sequelize, Sequelize) => {
    const ItensPedido = sequelize.define("itensPedido", {
        quantidade: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        preco_unitario: {
            type: Sequelize.DECIMAL,
            allowNull:false
        }
    });
    ItensPedido.associate = function (models) {
        ItensPedido.belongsTo(models.pedido);
        ItensPedido.belongsTo(models.produto);
      };
    return ItensPedido
}