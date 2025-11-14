import express from "express"
import multer from "multer"
import releaseController from "../controllers/release.controller.js"
import illustrationController from "../controllers/illustration.controller.js"


const router = express.Router()
const upload = multer()

router.get("/releases", releaseController.findAll)
router.get("/releases/:id", releaseController.findById)
router.post("/releases", upload.none(), releaseController.create)
router.delete("/releases/:id", releaseController.deleteByPk)
router.put("/releases/:id", upload.none(), releaseController.update)

router.get("/illustrations", illustrationController.findAll)
router.get("/illustrations/:id", illustrationController.findById)
router.post("/illustrations", upload.none(), illustrationController.create)
router.delete("/illustrations/:id", illustrationController.deleteByPk)
router.put("/illustrations/:id", upload.none(), illustrationController.update)


export default router
