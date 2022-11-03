const redis = require("redis");
const REDIS_PORT = 6379;

const client = redis.createClient(REDIS_PORT);

client.on("error", (err) => {
  console.log("Error " + err);
});

client.connect();

async function getter() {
  console.log("getter called");


  // await client.set('mynewkey','mynewvalue');
  // let value = await client.get('mynewkey');
  // console.log(value);


    await client.set('tempKey', 'tempValue', {
        EX: 15
      });
    let value = await client.get('tempKey');
    console.log(value);

    
//   let result = await client.hSet(
//     "hashKey",
//     "name",
//     "dev",
//     "age",
//     22,
//     "dept",
//     "IT"
//   );
//   console.log(result);
//   let value = await client.hGetAll("hashKey");
// //   let value = await client.sendCommand(['HGETALL', 'hashKey']); ;
//   console.log("\nvalue\n\n", value);


  //   await client.set("another-key", "another-value");
  //   let [setKeyReply, getKey1, getAnotherKey] = await client
  //     .multi()
  //     .set("key1", "val1")
  //     .get("key1")
  //     .get("another-key")
  //     .exec(); // ['OK', 'another-value']
  //   console.log(setKeyReply, getKey1, getAnotherKey);

  await client.disconnect();
}

getter();
