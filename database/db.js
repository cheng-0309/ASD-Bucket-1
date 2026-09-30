const fs = require('fs/promises');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'db.json');

async function readData() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return JSON.parse(await fs.readFile(DB_PATH, 'utf-8'));
}

async function writeData(data) {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };
