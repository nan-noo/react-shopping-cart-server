const jsonServer = require("json-server");
const cors = require("cors");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

var corsOptions = {
  origin: "*",
};

server.use(cors(corsOptions));
server.use(middlewares);
server.use(router);

const port = 8080;
server.listen(port, () => {
  console.log(`JSON Server is running on ${port}`);
});
