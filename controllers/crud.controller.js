export function crud_controller(model) {
    return {
        async findAll(request, response) {
            try {
                const result = await model.findAll({raw: true});
                response.status(200).json(result);
            } catch(err) {
                response.status(500).json(err);
            }
        },

        async findById(request, response) {
            try {
                const result = await model.findByPk(request.params.id);
                response.status(200).json(result);
            } catch (err) {
                response.status(500).json(err);
            }
        },

        async create(request, response) {
            try {
                const result = await model.create(request.body);
                response.status(201).json(result);
            } catch(err)  {
                console.log(err, "base")
                response.status(500).json(err);
            }
        },

        async deleteByPk(request, response) {
            try {
                const count = await model.destroy({where: { id: request.params.id } });
                if (count === 0) {
                    return response.status(404).json({ message: "Not found" });
                } else {
                    return response.status(200).json({ message: "Deleted" });
                }
            } catch (err) {
                return response.status(500).json(err);
            }
        },

        async update(request, response) {
            try {
                const id = request.params.id;
                const instance = await model.findByPk(id);

                if (!instance) {
                    response.status(404).json({ message: "Not found" });
                } else {
                    await instance.update(request.body);

                    response.status(200).json({
                        message: "Updated",
                        data: instance
                    });
                }
            } catch (err) {
                return response.status(500).json(err);
            }
        }
    }
}
