/*
 * NOTA: código foi copiado do github da professora Bruna (com pequenas alterações):
 * https://github.com/brunaru/AulaBackEnd-2025/blob/main/media/media.uploader.js
 */


import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import dotenv from "dotenv"

dotenv.config()
const secret = process.env["AUTH_SECRET"]

function getToken(uid, uemail) {
    const meuToken = jwt.sign(
        {
            sub: uid,
            email: uemail,
        },
        secret,
        {
            expiresIn: "30d",
        },
    )
    return meuToken
}

async function login(request, response) {
    // valores vazios
    if (!request.body.password || !request.body.email) {
        return response.status(400).send("Informe usuário e senha!")
    }

    // não existe
    const user = await User.findOne({
        where: { email: request.body.email },
    })
    if (!user) {
        return response.status(400).send("Usuário não cadastrado!")
    }

    // compara senha
    const isEqual = bcrypt.compareSync(request.body.password, user.password)
    // inválida
    if (!isEqual) {
        return response.status(401).send("Usuário e senha inválidos!")
    }
    // usuário e senha válidos, cria token
    const meuToken = getToken(user.id, user.email)
    return response
    .status(200)
    .json({ id: user.id, email: user.email, token: meuToken })
}

async function validateToken(request, response, next) {
    let token = request.headers.authorization
    try {
        if (token && token.startsWith("Bearer")) {
            token = token.substring(7, token.length)
            const decodedToken = jwt.verify(token, secret)
            next()
        } else {
            return response.status(401).send({ message: "Unauthorized" })
        }
    } catch (e) {
        return response.status(401).send({ message: "Unauthorized" })
    }
}

function findAll(request, response) {
    User.findAll()
    .then(function (res) {
        response.json(res).status(200)
    })
    .catch(function (err) {
        response.json(err).status(500)
    })
}

export default { login, validateToken, findAll }
