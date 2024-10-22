const redis = require("redis");

const client = redis.createClient({
  // password: process.env.REDIS_PASSWORD,
  socket: {
    port: process.env.REDIS_PORT_LOCAL,
    host: process.env.REDIS_HOST_LOCAL,
  },
});

client.connect();

client.on("connect", () => {
  console.log("Client connected to redis...");
});

client.on("ready", () => {
  console.log("Client connected to redis and ready to use...");
});

client.on("error", (err) => {
  console.log(err.message);
});

client.on("end", () => {
  console.log("Client disconnected from redis");
});

client.on("SIGINT", () => {
  client.quit();
});

module.exports = client;
