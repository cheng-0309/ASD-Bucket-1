const service = require('../services/productService');

exports.getAll = async (req, res) => {
    try {
        res.json(await service.getAll());
    } catch {
        res.status(500).send('Error reading file');
    }
};

exports.getById = async (req, res) => {
    try {
        const product = await service.getById(Number(req.params.id));
        product ? res.json(product) : res.status(404).json({ error: 'Not found' });
    } catch {
        res.status(500).send('Error reading file');
    }
};

exports.create = async (req, res) => {
    try {
        res.status(201).json(await service.create(req.body));
    } catch {
        res.status(500).send('Error writing file');
    }
};

exports.update = async (req, res) => {
    try {
        const product = await service.update(Number(req.params.id), req.body);
        product ? res.json(product) : res.status(404).json({ error: 'Not found' });
    } catch {
        res.status(500).send('Error writing file');
    }
};

exports.remove = async (req, res) => {
    try {
        const product = await service.remove(Number(req.params.id));
        product ? res.json(product) : res.status(404).json({ error: 'Not found' });
    } catch {
        res.status(500).send('Error writing file');
    }
};
