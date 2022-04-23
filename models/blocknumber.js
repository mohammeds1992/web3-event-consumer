module.exports = (sequelize, DataTypes) => {
    const Blocknumber = sequelize.define("blocknumber", {
        eventType: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        currentBlockNumber: {
            type: DataTypes.BIGINT,
            allowNull: false,
        }
    })
    return Blocknumber
}