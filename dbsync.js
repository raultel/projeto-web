import Release from './models/release.model.js'
import Illustration from './models/illustration.model.js'
import sequelize from './dbconfig.js';
import User from "./models/user.model.js";
import bcrypt from "bcryptjs";

const password = "123"
const email = "R4YMiX"
const hashedPassword = bcrypt.hashSync(password, 10); // 10 = salt rounds

await User.create({ email: email, password: hashedPassword});

process.exit();
