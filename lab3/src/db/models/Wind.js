const {DataTypes} = require("sequelize");
const {WindDirectionEnum} = require("./Weather");

const Wind = sequelize.define('wind', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    weather_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'weather',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    speed: {
        type: DataTypes.DOUBLE,
    },
    degree: {
        type: DataTypes.DOUBLE,
    },
    direction: {
        type: DataTypes.ENUM({ values: Object.values(WindDirectionEnum) }),
    },
}, {
    tableName: 'wind',
    timestamps: false,
});

module.exports = {Wind};