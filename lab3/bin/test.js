require('dotenv').config();

const {Command} = require('commander');
const { sequelize } = require('../src/db/sequelize');
const { runMigrations } = require('../src/db');
const program = new Command();

program
  .name('run')
  .action(async () => {
    await sequelize.authenticate();
    console.log('DB connected');

    await runMigrations();

    await sequelize.close();
  })

program.parse();
