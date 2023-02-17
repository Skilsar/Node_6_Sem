const redis = require('redis');
const client = redis.createClient();

(async () => {
    await client.connect();

    await client.publish('notify', 'Test notification', () => {});
    process.exit(0);
})();
