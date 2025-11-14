import express from "express"
import multer from "multer"
import releaseController from "../controllers/release.controller.js"
import illustrationController from "../controllers/illustration.controller.js"
import authController from "../controllers/auth.controller.js"

const router = express.Router()
const upload = multer()

router.post("/auth/signup", authController.register);
router.post("/auth/signin", authController.login);

router.get("/releases", releaseController.findAll)
router.get("/releases/:id", releaseController.findById)
router.post("/releases", upload.none(), authController.validateToken, releaseController.create)
router.delete("/releases/:id", authController.validateToken, releaseController.deleteByPk)
router.put("/releases/:id", upload.none(), authController.validateToken, releaseController.update)

router.get("/illustrations", illustrationController.findAll)
router.get("/illustrations/:id", illustrationController.findById)
router.post("/illustrations", upload.none(), authController.validateToken, illustrationController.create)
router.delete("/illustrations/:id", authController.validateToken, illustrationController.deleteByPk)
router.put("/illustrations/:id", upload.none(), authController.validateToken, illustrationController.update)


export default router
