const {Weather} = require("../db/models/Weather");
const {WeatherRepository} = require("./weather.repository");

class WeatherService {
    constructor({weatherRepository}){
        this.weatherRepository = weatherRepository;
    }
    async getInfo({date, country}) {
        const data = await this.weatherRepository.getInfo({date, country});
        return await data.map(({dataValues}) => dataValues);
    }
}

const weatherRepository = new WeatherRepository();
const weatherService = new WeatherService({weatherRepository})

module.exports = {weatherService}