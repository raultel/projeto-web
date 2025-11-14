import express from "express";
import sequelize from "./dbconfig.js";
import Release from "./models/release.model.js";
import Illustration from "./models/illustration.model.js";
import routes from "./routes/api.routes.js";

const app = express();

app.use(express.json());

app.use("/api", routes);

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

await sequelize.sync();

app.listen(3000, () => {
    console.log("App running on port 3000");
});
