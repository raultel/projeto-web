import User from "./models/user.model.js";
import bcrypt from "bcryptjs";
import sequelize from "./dbconfig.js"

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

const hashedPassword = bcrypt.hashSync(password, 10);

await sequelize.sync();
await User.create({ email: email, password: hashedPassword});

process.exit();
