const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.PORT = process.env.PORT;
    this.app = express();
    this.connectDB();
    this.middlewares();
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app
      .use(cors())
      .use(express.static("./src/public"))
      .use(express.json());
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
