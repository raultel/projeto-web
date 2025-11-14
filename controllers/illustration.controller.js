import model from "../models/illustration.model.js";

// GET all
async function findAll(req, res) {
    try {
        const resData = await model.findAll({ raw: true });
        res.status(200).json(resData);
    } catch (err) {
        res.status(500).json(err);
    }
}

// GET by ID
async function findById(req, res) {
    try {
        const instance = await model.findByPk(req.params.id);
        if (!instance) return res.status(404).json({ message: "Not found" });
        res.status(200).json(instance);
    } catch (err) {
        res.status(500).json(err);
    }
}

// CREATE
async function create(req, res) {
    try {
        // Store only the object key in the DB
        const path = req.file ? req.file.key : req.body.path;

        const illustration = await model.create({
            title: req.body.title,
            description: req.body.description,
            path,
        });

        res.status(201).json(illustration);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

// UPDATE
async function update(req, res) {
    try {
        const instance = await model.findByPk(req.params.id);
        if (!instance) return res.status(404).json({ message: "Not found" });

        // Determine new path
        const path = req.file ? req.file.key : instance.path;

        await instance.update({
            title: req.body.title,
            description: req.body.description,
            path,
        });

        res.status(200).json({ message: "Updated", data: instance });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

// DELETE
async function deleteByPk(req, res) {
    try {
        const count = await model.destroy({ where: { id: req.params.id } });
        if (count === 0) return res.status(404).json({ message: "Not found" });
        res.status(200).json({ message: "Deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

export default { findAll, findById, create, update, deleteByPk };
