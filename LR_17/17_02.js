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
    //SET
    console.time('setTime');
    for (var i = 0; i < 10000; i++) {
        await client.set(`k${i}`, `v${i}`);
    }
    console.timeEnd('setTime');
    //GET
    console.time('getTime');
    for (var i = 0; i < 10000; i++) {
        await client.get(`k${i}`);
    }
    console.timeEnd('getTime');
    //DELETE
    console.time('delTime');
    for (var i = 0; i < 10000; i++) {
        await client.del(`k${i}`);
    }
    console.timeEnd('delTime');
    client.quit();
});