import { crud_controller } from "./crud.controller.js"
import media_uploader from "../media/media_uploader.js"

const prefix = 'http://localhost:9000/devweb/' // TO-DO: get this from env

function getFilenameFromUrl(url) {
    // Remove any trailing slash first
    if (url.endsWith("/")) {
        url = url.slice(0, -1);
    }
    const parts = url.split("/");
    return parts[parts.length - 1];
}

export function illustration_controller(model) {
    const base = crud_controller(model);

    return {
        ...base,

        async create(request, response) {
            try {
                if (request.file && request.file.location) {
                    request.body.img_path = prefix+getFilenameFromUrl(request.file.location);
                }
                return base.create(request, response);
            } catch (err) {
                console.log(err)
                response.status(500).json(err);
            }
        },

        async update(request, response) {
            try {
                if (request.file && request.file.location) {
                    request.body.img_path = prefix+getFilenameFromUrl(request.file.location);
                }
                return base.update(request, response);
            } catch (err) {
                console.log(err)
                response.status(500).json(err);
            }
        },
        async deleteByPk(request, response) {
            try {
                const id = request.params.id;

                const item = await model.findByPk(id);
                if (!item) {
                    return response.status(404).json({ error: "Item not found" });
                }

                if (item.img_path) {
                    try {
                        await media_uploader.deleteFile(item.img_path);
                    } catch (err) {
                        console.log(err);
                        return response.status(500).json({ error: "Failed to delete image from MinIO" });
                    }
                }
                return base.deleteByPk(request, response);

            } catch (err) {
                console.log(err)
                response.status(500).json(err);
            }
        },
    }
}
