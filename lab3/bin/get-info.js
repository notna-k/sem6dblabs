require('dotenv').config();

const { Command } = require('commander');
const { weatherService } = require("../src/weather/weather.service");
const { sequelize } = require('../src/db/sequelize');
const { runMigrations } = require('../src/db');
const program = new Command();

program
  .requiredOption('-c, --country <country>', 'Country name')
  .requiredOption('-d, --date <date>', 'Date in YYYY-MM-DD format')
  .action(async (opts) => {
    const { country, date } = opts;

    if (!country) throw new Error('Parameter "country" (--country) is required!');
    if (!date) throw new Error('Parameter "date" (--date) is required!');

    await sequelize.authenticate();
    console.log('DB connected');

    await runMigrations();

    const data = await weatherService.getInfo({ country, date });
    console.log(data);

    await sequelize.close();
  });

program.parse(process.argv);
