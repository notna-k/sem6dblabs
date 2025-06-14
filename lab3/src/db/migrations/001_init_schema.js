module.exports.up = async ({ context: sequelize }) => {
    await sequelize.query(`
        CREATE TYPE wind_direction_enum AS ENUM (
          'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
          'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
        );
    `)
    await sequelize.query(`
        CREATE TABLE "weather" (
             id SERIAL PRIMARY KEY,
             country VARCHAR(100),
            location_name VARCHAR(100),
            latitude DOUBLE PRECISION,
            longitude DOUBLE PRECISION,
            timezone VARCHAR(100),
            last_updated TIMESTAMP,
            sunrise TIMESTAMP,
            wind_kph DOUBLE PRECISION,
            wind_degree DOUBLE PRECISION,
            wind_direction wind_direction_enum
            );
    `);

}

module.exports.down = async () => true;