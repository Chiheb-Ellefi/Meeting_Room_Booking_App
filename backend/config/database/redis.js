const { createClient } = require("redis");
//local configuration

/* const client = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
}); */
//online configuration
const client = createClient({
  password: process.env.REDIS_STACK_PASSWORD,
  socket: {
    host: process.env.REDIS_STACK_HOST,
    port: process.env.REDIS_STACK_PORT,
  },
});
client.on("error", (err) => console.log(err));
if (!client.isOpen) {
  client.connect();
}

module.exports = client;
