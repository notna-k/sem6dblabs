const { DataTypes } = require('sequelize');
const {sequelize} = require('../sequelize');

const WindDirectionEnum = {
    N: "N",
    NNE: "NNE",
    NE: "NE",
    ENE: "ENE",
    E: "E",
    ESE: "ESE",
    SE: "SE",
    SSE: "SSE",
    S: "S",
    SSW: "SSW",
    SW: "SW",
    WSW: "WSW",
    W: "W",
    WNW: "WNW",
    NW: "NW",
    NNW: "NNW",
};


const Weather = sequelize.define('weather', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    country: {
        type: DataTypes.STRING,
    },
    location_name: {
        type: DataTypes.STRING,
    },
    latitude: {
        type: DataTypes.DOUBLE,
    },
    longitude: {
        type: DataTypes.DOUBLE,
    },
    timezone: {
        type: DataTypes.STRING,
    },
    last_updated: {
        type: DataTypes.DATE,
    },
    wind_kph: {
        type: DataTypes.DOUBLE,
    },
    wind_degree: {
        type: DataTypes.DOUBLE,
    },
    wind_direction: {
        type: DataTypes.ENUM({ values: Object.values(WindDirectionEnum) }),
    },
}, {
    tableName: 'weather',
    timestamps: false,
});

module.exports = {Weather, WindDirectionEnum};
