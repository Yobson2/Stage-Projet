// redis.js
const redis = require("redis");

const redis_port = 6379;
const client = redis.createClient({
    host: "localhost",
    port: redis_port
});

(async () => {
    await client.connect();
})();

client.on('connect', () => console.log('------|Redis Client Connected|------'));
client.on('error', (err) => console.log('Redis Client Connection Error', err));

module.exports = client;
