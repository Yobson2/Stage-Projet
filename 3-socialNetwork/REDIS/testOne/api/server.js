const express = require("express");
const app = express();
const cors=require('cors');
const { json } = require("body-parser");
const redis_port = 6379;
const PORT = process.env.PORT || 8085;
const axios = require('axios');
const client = require('./db/confRedis');


// Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));



///Endpoints
let count = 1; 
app.post('/addPhoto', (req, res) => {
    const data = req.body;

    console.log('data 11', data);

    // Convertir l'objet JSON en chaîne de caractères
    const dataString = JSON.stringify(data); 
    let key = `user${count}`;

    count++
    client.set(key, dataString, (err, reply) => {
        if (err) {
            console.error("Error while setting data in Redis:", err);
            res.status(500).send('An error occurred while setting data in Redis.');
        } else {
            console.log(reply);
            res.send('Data set successfully in Redis.');
        }
    });
});


app.get('/allData', async (req, res) => {
    const tb = [];

    try {
        const data = await client.get('user1');
        if (data) {
            const mesdonnees = JSON.parse(data);
            tb.push(mesdonnees);

            const compressedData = JSON.stringify(mesdonnees);
            const items = {
                content : compressedData,
                time : Date.now()
            }
            console.log('dtdtdt',items)
            
            try {
                // const response = await axios.post('https://rabbit-server.vercel.app/api/v1/redis/receiveMsg', items, {
                //     headers: {
                //         // 'Content-Encoding': 'gzip',
                //         'Content-Type': 'application/json',
                //     },
                // });
                console.log('Réponse de l\'adresse cible:', );
            } catch (error) {
                console.error('Erreur lors de l\'envoi des données:', error);
            }

            // res.send('Données récupérées depuis Redis et envoyées à l\'adresse cible.');
            res.status(200).send('Data set successfully in Redis.');

            console.log('Données récupérées depuis Redis et envoyées à l\'adresse cible.')
        } else {
            res.send('Aucune donnée trouvée dans Redis.');
        }
    } catch (error) {
        console.error('Erreur Redis:', error);
        res.status(500).send('Erreur Redis.');
    }
});


app.get('/', (req, res) => {
    res.send('test server');
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
