import express from "express";
import router from "./routes/api.routes.js"
import sequelize from "./dbconfig.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", router);

async function startServer() {
    try {
        await sequelize.sync();
        app.listen(3000, () => {
            console.log("App running on port 3000");
        });
    } catch (err) {
        console.error("Unable to start server:", err);
    }
}

startServer();
