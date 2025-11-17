import express from "express";

import Release from "../models/release.model.js"
import Illustration from "../models/illustration.model.js"

import multer from "multer"
import media_uploader from "../media/media_uploader.js"

import {illustration_controller} from "../controllers/illustration.controller.js"
import authController from "../controllers/auth.controller.js"

const router = express.Router();

const release_ctl = illustration_controller(Release);
const illust_ctl = illustration_controller(Illustration);

router.post("/auth/signup", authController.register);
router.post("/auth/signin", authController.login);

router.get("/images", illust_ctl.findAll);
router.get("/images/:id", illust_ctl.findById);
router.post("/images", authController.validateToken, media_uploader.uploadFile.single('file'), illust_ctl.create);
router.delete("/images/:id", authController.validateToken, illust_ctl.deleteByPk); // TO-DO: delete the image?
router.put("/images/:id", authController.validateToken, media_uploader.uploadFile.single('file'), illust_ctl.update);

router.get("/releases", release_ctl.findAll);
router.get("/releases/:id", release_ctl.findById);
router.post("/releases", authController.validateToken, media_uploader.uploadFile.single('file'), release_ctl.create);
router.delete("/releases/:id", authController.validateToken, release_ctl.deleteByPk); // TO-DO: delete the image?
router.put("/releases/:id", authController.validateToken, media_uploader.uploadFile.single('file'), release_ctl.update);

export default router
