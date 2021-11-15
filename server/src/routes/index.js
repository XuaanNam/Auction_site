const apiRouter = require("./api");

function route(app) {
    app.use("/api", apiRouter);
}
module.exports = route;