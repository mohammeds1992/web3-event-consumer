module.exports = (sequelize, DataTypes) => {

    const Event = sequelize.define("event", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
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