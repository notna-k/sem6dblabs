module.exports.up = async ({ context: sequelize }) => {
    await sequelize.query(`
        CREATE TABLE wind (
                              id SERIAL PRIMARY KEY,
                              weather_id INTEGER REFERENCES weather(id) ON DELETE CASCADE,
                              speed FLOAT,
                              degree INTEGER,
                              direction TEXT,
                              should_go_outside BOOLEAN
        );
    `);

    await sequelize.query(`
        INSERT INTO wind (weather_id, speed, degree, direction, should_go_outside)
        SELECT
            w.id,
            w.wind_kph,
            w.wind_degree,
            w.wind_direction,
            CASE WHEN w.wind_kph > 30 THEN FALSE ELSE TRUE END
        FROM weather w;
    `);

    await sequelize.query(`
        ALTER TABLE weather
        DROP COLUMN wind_kph,
    DROP COLUMN wind_degree,
    DROP COLUMN wind_direction;
    `);
}

module.exports.down = async () => true;