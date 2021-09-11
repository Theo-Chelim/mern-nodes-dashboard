const express = require("express");
const cors = require("cors");
const http = require("http");

require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const edgeUtils = require("./utils/edge.utils");

edgeUtils.start_qemu_edge(12, "virt", "arm64", "cortex-a57", 1, 256);

const edgesRoutes = require("./routes/edge.routes");
const fileRoutes = require("./routes/file.routes");

const app = express();

const PORT = process.env.PORT || 9000;
const BASE_PATH = process.env.BASE_PATH_API;

app.use(
  cors({
    origin: `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(BASE_PATH + "edge", edgesRoutes);
app.use(BASE_PATH + "file", fileRoutes);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
