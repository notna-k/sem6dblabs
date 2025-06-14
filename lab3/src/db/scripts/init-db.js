const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { Weather } = require("../models/Weather");
const { sequelize } = require("../sequelize");
const { runMigrations } = require("../index");
require('dotenv').config();

async function importCSV(filePath) {
    const records = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (row) => records.push(row))
          .on('end', () => resolve(records))
          .on('error', reject);
    });
}

const insertChunk = async (model, chunk, index) => {
    await model.bulkCreate(chunk, {
        ignoreDuplicates: true,
    });
    console.log(`Inserted rows ${index * chunk.length + 1}-${index * chunk.length + chunk.length}`);
};

const chunkArray = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

const insertInChunks = async (model, data, chunkSize) =>
  Promise.all(chunkArray(data, chunkSize).map((chunk, index) => insertChunk(model, chunk, index)));

const CHUNK_SIZE = 1000;

async function initDB() {
    try {
        const filePath = path.join(process.cwd(), 'data', 'GlobalWeatherRepository.csv');
        const rows = await importCSV(filePath);

        await insertInChunks(Weather, rows, CHUNK_SIZE);

        console.log(`Finished inserting ${rows.length} records`);
    } catch (e) {
        console.error('Error:', e);
        process.exit(1);
    }
}

module.exports = { initDB };
