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
            return response.status(404).json({ message: "Not found" });
        }

        return response.status(200).json({ message: "Deleted" });
    })
    .catch(function (err) {
        return response.status(500).json(err);
    });
}


export async function update(request, response) {
    try {
        console.log(request.body, "update")
        const id = request.params.id;

        const instance = await model.findByPk(id);
        if (!instance) {
            return response.status(404).json({ message: "Not found" });
        }

        await instance.update(request.body);

        return response.status(200).json({
            message: "Updated",
            data: instance
        });
    } catch (err) {
        return response.status(500).json(err);
    }
}


export default { findAll, findById, create, deleteByPk, update}
