import express from "express"
import multer from "multer"
import releaseController from "../controllers/release.controller.js"
import illustrationController from "../controllers/illustration.controller.js"
import authController from "../controllers/auth.controller.js"
import mediaUploader from "../media/media.uploader.js"

const router = express.Router()
const upload = multer()

router.post("/auth/signup", authController.register);
router.post("/auth/signin", authController.login);

router.get("/releases", releaseController.findAll)
router.get("/releases/:id", releaseController.findById)
router.post("/releases", upload.none(), authController.validateToken, releaseController.create)
router.delete("/releases/:id", authController.validateToken, releaseController.deleteByPk)
router.put("/releases/:id", upload.none(), authController.validateToken, releaseController.update)

router.post(
    "/illustrations",
    authController.validateToken,                    // auth middleware
    mediaUploader.uploadFile.single("path"),       // multer-s3 single file upload
    illustrationController.create                   // controller
)

router.get(
    "/illustrations",
    // authController.validateToken,
    illustrationController.findAll
)

router.get(
    "/illustrations/:id",
    // authController.validateToken,
    illustrationController.findById
)

router.get("/image/:filename", async (req, res) => {
    const filename = req.params.filename;
    if (!filename) return res.status(400).json({ error: "Filename required" });

    try {
        const url = await mediaUploader.getFileUrl(filename);
        res.json({ url });
    } catch (err) {
        console.error("Failed to generate presigned URL:", err);

        // Check if the error is "object not found" or similar
        res.status(404).json({ error: "File not found" });
    }
});

router.put(
    "/illustrations/:id",
    authController.validateToken,
    mediaUploader.uploadFile.single("path"),
    illustrationController.update
);

router.delete(
    "/illustrations/:id",
    authController.validateToken,
    illustrationController.deleteByPk
)

export default router
