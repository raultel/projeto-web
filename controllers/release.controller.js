import model from "../models/release.model.js"

function findAll(request, response) {
    model.findAll({ raw: true })
    .then(function (res) {
        response.status(200).json(res);
    })
    .catch(function (err) {
        response.status(500).json(err);
    });
}


function findById(request, response) {
    model.findByPk(request.params.id)
    .then(function (res) {
        response.status(200).json(res)
    })
    .catch(function (err) {
        response.status(500).json(err)
    })
}

function create(request, response) {
    model.create({
        title: request.body.title,
        description: request.body.description,
        year: request.body.year,
    })
    .then(function (res) {
        response.status(201).json(res)
    })
    .catch(function (err) {
        response.status(500).json(err)
    })
}

function deleteByPk(request, response) {
    model
    .destroy({ where: { id: request.params.id } })
    .then(function (count) {
        if (count === 0) {
            response.json({ message: "Not found" }).status(404)
        }

        response.status(200).json({ message: "Deleted" })
    })
    .catch(function (err) {
        response.status(500).json(err)
    })
}

async function update(request, response) {
    try {
        const id = request.params.id

        const potion = await model.findByPk(id)
        if (!potion) {
            return response.status(404).json({ message: "Not found" })
        }

        await potion.update(request.body)

        response.status(200).json({ message: "Updated", potion })
    } catch (err) {
        response.status(500).json(err)
    }
}


export default { findAll, findById, create, deleteByPk, update}
