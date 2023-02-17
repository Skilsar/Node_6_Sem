let redis = require('redis')
let client = redis.createClient();

client.on('error', function (err) {
    console.log('Error: ', err)
})

client.on('end', () => {
    console.log('Connect closed')
});

client.connect(() => {
    console.log('Connected to Redis');
}).then(async () => {
    //hset
    console.time('hSetTime');
    for (var i = 0; i < 10000; i++) {
        await client.hSet('hashTest',`key${i}`, `val-${i}`)
    }
    console.timeEnd('hSetTime');
    //hget
    console.time('hGetTime');
    for (var i = 0; i < 10000; i++) {
        await client.hGet('hashTest', `key${i}`, `val-${i}`)
    }
    console.timeEnd('hGetTime');
    client.quit();
});