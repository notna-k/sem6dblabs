require('dotenv').config();

const {Command} = require('commander');
const {initDB} = require("../src/db/scripts/init-db");
const { sequelize } = require('../src/db/sequelize');
const { runMigrations } = require('../src/db');
const program = new Command();

program
    .name('run')
    .action(async () => {
      await sequelize.authenticate();
      console.log('DB connected');

      await runMigrations();

        await initDB();
      await sequelize.close();

    })

program.parse();
