const jsonServer = require("json-server");
const cors = require("cors");

const db = require("./db.json");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

var corsOptions = {
  origin: "*",
};

server.get("/product-list/:pageNo", (req, res) => {
  const { pageNo } = req.params;
  const { products } = db;

  const productsPerPage = 8;
  const startIndex = (pageNo - 1) * productsPerPage;
  const endIndex = pageNo * productsPerPage;
  const pageResult = products.slice(startIndex, endIndex);

  res.json({
    pageResult,
    lastPage: Math.ceil(products.length / productsPerPage),
  });
});

server.get("/product-list/", (req, res) => {
  res.status(400).send("BAD REQUEST: NEED PAGE NUMBER PARAMETER");
});

server.use(cors(corsOptions));
server.use(middlewares);
server.use(router);

const port = process.env.PORT || 9000;
server.listen(port, () => {
  console.log(`JSON Server is running on ${port}`);
});
