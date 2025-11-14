import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import dotenv from "dotenv"

dotenv.config()
const secret = process.env["AUTH_SECRET"]

async function register(request, response) {
    // valores vazios
    if (!request.body.password || !request.body.email) {
        response.status(400).send("Informe usuário e senha!")
    }
    // já existe cadastro no bd
    let user = await User.findOne({ where: { email: request.body.email } })
    if (user) {
        response.status(400).send("Usuário já cadastrado!")
    }
    // hashing da senha
    const salt = bcrypt.genSaltSync()
    const hashedPassword = bcrypt.hashSync(request.body.password, salt)
    // cadastra usuario
    User.create({
        email: request.body.email,
        password: hashedPassword,
    })
    .then((result) => {
        // criar e devolver o token
        const meuToken = getToken(
            result.dataValues.id,
            result.dataValues.email,
        )
        response.status(201).send({ token: meuToken })
    })
    .catch((erro) => {
        console.log(erro)
        response.status(500).send(erro)
    })
}

function getToken(uid, uemail) {
    console.log(secret)
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

export default { register, login, validateToken, findAll }
