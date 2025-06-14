const {Weather} = require("../db/models/Weather");
const {Op} = require("sequelize");

class WeatherRepository {
    constructor(){
        this.model = Weather
    }

    async getInfo({ date, country }) {
        const startOfDay = new Date(date);
        const endOfDay = new Date(date);
        endOfDay.setDate(endOfDay.getDate() + 1);

        return await this.model.findAll({
            where: {
                country,
                last_updated: {
                    [Op.gte]: startOfDay,
                    [Op.lt]: endOfDay,
                },
            },
        });
    }

}

module.exports = {WeatherRepository};