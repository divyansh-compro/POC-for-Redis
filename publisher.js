const redis = require('redis');
const publisher = redis.createClient();

(async () => {
  await publisher.connect();
  await publisher.publish('news', '(message from news)');
  await publisher.publish('channel', '(message from channel)');
  await publisher.publish('channel2', '(message from channel2)');
})();