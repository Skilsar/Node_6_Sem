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
    //incr
    console.time('incrTime');
    for (var i = 0; i < 10000; i++) {
        client.incr('val')
    }
    console.timeEnd('incrTime');
    //decr
    console.time('decrTime');
    for (var i = 0; i < 10000; i++) {
        client.decr('val')
    }
    console.timeEnd('decrTime');
    client.quit();
});