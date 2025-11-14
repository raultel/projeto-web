import sequelize from "./dbconfig.js";
import User from "./models/user.model.js";

const user = await User.findAll();
console.log(user.map(u => ({ email: u.email, password: u.password })));
