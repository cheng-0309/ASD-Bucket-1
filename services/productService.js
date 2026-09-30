const { readData, writeData } = require('../database/db');

exports.getAll = () => readData();

exports.getById = async (id) => {
    const data = await readData();
    return data.find(item => item.id === id);
};

exports.create = async (product) => {
    const data = await readData();
    product.id = data.length ? Math.max(...data.map(p => p.id)) + 1 : 1;
    data.push(product);
    await writeData(data);
    return product;
};

exports.update = async (id, updates) => {
    const data = await readData();
    const idx = data.findIndex(item => item.id === id);
    if (idx === -1) return null;
    data[idx] = { ...data[idx], ...updates, id };
    await writeData(data);
    return data[idx];
};

exports.remove = async (id) => {
    const data = await readData();
    const idx = data.findIndex(item => item.id === id);
    if (idx === -1) return null;
    const [deleted] = data.splice(idx, 1);
    await writeData(data);
    return deleted;
};
