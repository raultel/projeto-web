import express from "express";
import sequelize from "./dbconfig.js";
import routes from "./routes/api.routes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.use("/api", routes);

// Start server after syncing database
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
