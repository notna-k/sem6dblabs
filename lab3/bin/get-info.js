require('dotenv').config();

const {Command, Option} = require('commander');
const {weatherService} = require("../src/weather/weather.service");
const program = new Command();

program
    .name('run')
    .addOption(new Option('-c, --country'))
    .addOption(new Option('-d, --date'))
    .action(async ({country, date}) => {
        if(!country) throw new Error('Parameter "country" (--country) is required!');
        if(!date) throw new Error('Parameter "date" (--date) is required!');
        const data = await weatherService.getInfo({country, date})
        console.log(data)
    })

program.parse();
