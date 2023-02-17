const redis = require('redis');

(async () => {

    const client = redis.createClient();

    const subscriber = client.duplicate();

    await subscriber.connect();

    await subscriber.subscribe('notify', (message) => {
        console.log(message);
    });
})();