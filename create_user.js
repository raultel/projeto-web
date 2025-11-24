import User from "./models/user.model.js";
import bcrypt from "bcryptjs";
import sequelize from "./dbconfig.js"

const password = "123"
const email = "R4YMiX"
const hashedPassword = bcrypt.hashSync(password, 10);

await sequelize.sync();
await User.create({ email: email, password: hashedPassword});

process.exit();
