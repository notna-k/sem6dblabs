require('dotenv').config();

const {Command} = require('commander');
const {initDB} = require("../src/db/scripts/init-db");
const program = new Command();

program
    .name('run')
    .action(async () => {
        await initDB();
    })

program.parse();
