const redis = require("redis");

const PORT = 5000;
const REDIS_PORT = 6379;

const client = redis.createClient(REDIS_PORT);

client.on("error", (err) => {
  console.log("Error " + err);
});

client.connect();

(async () => {
  
  const subscriber1 = client.duplicate();

  await subscriber1.connect();
  
  await subscriber1.subscribe('news', (message) => {
    console.log(message); // 'message'
  });
  
  await subscriber1.pSubscribe('channe*', (message, channel) => {
    console.log(message, channel); // 'message', 'channel'
  });
  
//   await subscriber1.unsubscribe('news');
//   await subscriber1.pUnsubscribe('channe*');
  await client.disconnect();
})();
