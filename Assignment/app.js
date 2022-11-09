const redis = require("redis");
let data = require("./data.json")
const REDIS_PORT = 6379;
const client = redis.createClient(REDIS_PORT);

client.on("error", (err) => {
  console.log("Error " + err);
});

client.connect();

client.configSet("notify-keyspace-events", "Ex");

const sub= client.duplicate();
sub.connect();


const mainFunction = async (mainKey, mainValue, time) => {
   
    await client.set(mainKey, mainValue); //Set main key-value pair
    
    let tempKey = 't.' + mainKey;  //mapping of temp key with main key
    
    await client.set(tempKey, '', { // set temp key
        EX: time
    });
    
    let value = null;
    await sub.subscribe("__keyevent@0__:expired", (key, val) => {
        console.log("Deleted Key = ", key);        
        client.get(mainKey).then(value => console.log("Value of Main Key = " , value));
    }) 
}

mainFunction(data.key, data.value, Number(data.expireTime));
