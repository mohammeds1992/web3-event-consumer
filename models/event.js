module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define("events", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        transactionHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        eventType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        event: {
            type: DataTypes.JSON,
            allowNull: false,
            get() {
                return JSON.parse(this.getDataValue("event"));
            },
            set(value) {
                return this.setDataValue("event", JSON.stringify(value));
            }
        }
    })
    return Event
}