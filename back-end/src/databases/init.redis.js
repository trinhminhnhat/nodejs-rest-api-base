const { createClient } = require('redis');
const client = createClient({
    url: process.env.REDIS_URL
});

client.connect().then(() => console.log('Redis client connected'));

client.on('error', (err) => console.log('Redis client error', err));

module.exports = client;
