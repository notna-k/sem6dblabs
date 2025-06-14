
const { Umzug, SequelizeStorage } = require('umzug');
const { sequelize } = require('./sequelize');
const path = require("node:path");

function createUmzugInstance() {
    return new Umzug({
        migrations: {
            glob: path.join(process.cwd(), 'src', 'db', 'migrations', '*.js'),
        },
        context: sequelize,
        storage: new SequelizeStorage({ sequelize }),
        logger: console,
    });
}

async function runMigrations() {
    const umzug = createUmzugInstance();
    await umzug.up();
    console.log('All migrations executed');
}

module.exports = {runMigrations}