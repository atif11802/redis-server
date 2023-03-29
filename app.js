const express = require('express');
const app = express();
const redis = require('redis');

const client = redis.createClient()

const connectRedis = async () => {
    try {
        await client.connect();
        console.log('Connected to Redis');
    } catch (err) {
        console.log(err);
    }
}

connectRedis();

app.get("/", async (req, res) => {

    // await client.del("fname", "lname");



    await client.set("fname", req.query.fname,);
    await client.set("lname", req.query.lname);
    await client.setEx("secret", 10, "secret", (err, reply) => {
        console.log(reply);
    });

    res.send("saved");
})


app.get("/data", async (req, res) => {
    let fname = await client.get("fname");
    let lname = await client.get("lname");
    const secret = await client.get("secret");



    res.send({ fname, lname, secret });
})


app.listen(8000, () => {
    console.log(`server running on localhost:8000`);
}
)