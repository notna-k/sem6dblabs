require('dotenv').config();

const {Command, Option} = require('commander');
const {weatherService} = require("../src/weather/weather.service");
const { sequelize } = require('../src/db/sequelize');
const { runMigrations } = require('../src/db');
const { initDB } = require('../src/db/scripts/init-db');
const program = new Command();

program
    .name('run')
    .addOption(new Option('-c, --country'))
    .addOption(new Option('-d, --date'))
    .action(async ({country, date}) => {
        if(!country) throw new Error('Parameter "country" (--country) is required!');
        if(!date) throw new Error('Parameter "date" (--date) is required!');


      await sequelize.authenticate();
      console.log('DB connected');

      await runMigrations();

      const data = await weatherService.getInfo({country, date})
      console.log(data)
      await sequelize.close();
    })

program.parse();
