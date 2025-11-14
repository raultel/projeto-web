import Release from './models/release.model.js'
import Illustration from './models/illustration.model.js'
import sequelize from './dbconfig.js';
import User from "./models/user.model.js";

await sequelize.sync();
await Release.create({
    title: 'Memorix',
    description: 'My butterfly',
    year: 2024,
});

await Illustration.create({
    title: 'Nympha',
    description: 'My butterfly',
    path: 'path/to/image',
});


import bcrypt from "bcryptjs";

// when creating a user
const password = "123"
const email = "R4YMiX"
const hashedPassword = bcrypt.hashSync(password, 10); // 10 = salt rounds

await User.create({ email: email, password: hashedPassword});

console.log("Seed inserted!");
process.exit();
