const redis = require('redis');

const client = redis.createClient({url:'redis://localhost:16379/'});

client.on('ready', ()=>{console.log('Redis client is ready');});

client.on('connect', ()=>{console.log('Connected to Redis')});

client.on('end', ()=>{console.log('Connect closed')});

client.on('error', () => {console.log('Error: ', err)});

client.connect().then(()=>{
    setTimeout(() => {
        client.quit();
    }, 1000);
}).catch((err)=>{
    console.log('Error: ', err)
});