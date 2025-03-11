import "dotenv/config";
import { createServer } from "http";
import app from "./app.js";

const PORT = process.env.APP_PORT || 8080;

const server = createServer(app);
server.listen(PORT);

server.on("listening", () =>
  console.log(`server is listening on port http://localhost:${PORT}`)
);
server.on("error", () => console.log(`server is not litening on port:${PORT}`));
