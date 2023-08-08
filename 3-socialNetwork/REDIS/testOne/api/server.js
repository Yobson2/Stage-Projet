const express = require("express");
const redis = require("redis");
const app = express();
const cors=require('cors');
const redis_port = 6379;
const port = 8085;

const client = redis.createClient({
    host: "localhost",
    port: redis_port
    //   url: "redis://admin123@ec2-35-182-15-126.ca-central-1.compute.amazonaws.com",
});

(async () => {
    await client.connect();
})();

client.on('connect', () => console.log('------|Redis Client Connected|------'));
client.on('error', (err) => console.log('Redis Client Connection Error', err));


// Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

///Endpoints
app.post('/addPhoto', (req, res) => {
    const data = req.body;

    console.log('data', data);

    // Convertir l'objet JSON en chaîne de caractères
    const dataString = JSON.stringify(data);

    client.set("user_name", dataString, (err, reply) => {
        if (err) {
            console.error("Error while setting data in Redis:", err);
            res.status(500).send('An error occurred while setting data in Redis.');
        } else {
            console.log(reply);
            res.send('Data set successfully in Redis.');
        }
    });
});

app.get('/allData', (req, res) => {
    client.get("user_name", (err, reply) => {
        if (err) {
            console.error("Error while getting data from Redis:", err);
            res.status(500).send('An error occurred while getting data from Redis.');
        } else {
            console.log(reply);
            res.send(`User Name: ${reply}`);
        }
    });
});

app.get('/', (req, res) => {
    res.send('test server');
});

app.listen(port, () => {
    console.log(`Node server started at port ${port}`);
});
