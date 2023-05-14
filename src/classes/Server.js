const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT;
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors()).use(express.static("./src/public")).use(express.json());

  }

  routes() {
    this.app.use("/api", require("./../routes"));
  }

  listen() {
    this.app.listen(this.PORT, () => {
      console.log(`Server running on port ${this.PORT}`);
    });
  }
}

module.exports = Server;
