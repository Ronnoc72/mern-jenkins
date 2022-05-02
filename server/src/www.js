// requiring the app and http server.
const app = require("./app");
const debug = require("debug")("api:server");
const http = require("http");

const port = normalizePort(process.env.PORT || "9000");
app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
// if an error happens when the server is connecting.
function onError(error) {
    if (error.syscall !== "listen") {
        console.log("error");
        throw error;
    }
    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
// when the server is successful and displays the port that the server is on.
function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
    console.log("Listening on " + bind);
}
