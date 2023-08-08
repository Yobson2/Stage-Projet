const express = require('express');
const redis = require('redis');
const cors = require('cors');
const port = 8085;
const redis_port = 6379;
const app = express();

// Création du client Redis
// const client = redis.createClient(redis_port);

const client = redis.createClient({
    host: "localhost",
    port: redis_port
});
async function stop() {
    await client.disconnect();
  }
  
  stop();




// client.on("error", error => {
//     if(error) {
//         console.error("ERROR***",error);
//     }else {
//         console.log("Redis connect.");
//     }
// });


// //SET
// client.set("user_name", "Furkan", (err, msg) => {
//     if(err) {
//         console.error("Error while connecting redis", err);
//     }else {
//         console.log(msg);
//     } 
// })





// Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// Test serveur
app.get('/', (req, res) => {
    res.send('Bienvenue sur mon serveur');
});

app.post('/addPhoto', async (req, res) => {
    try {
        const data = req.body;
        // let count = await client.incr('count');  // Utilisation de await pour obtenir le compteur incrémenté
        // let key = `infos${count}`;

        console.log('data', data);

        //set to redis
        // client.setEx(key, data)

        // Utilisation du client Redis pour enregistrer les données
        await client.set("key", data);

        // console.log('Données enregistrées dans Redis:', key);
        // res.status(200).json({ message: 'Données ajoutées avec succès dans Redis' });
    } catch (err) {
        console.error('Erreur Redis:', err);
        res.status(500).json({ message: 'Erreur lors de l\'enregistrement dans Redis' });
    }
});

app.get('/allData', (req, res) => {
    client.keys('infos*', async (err, keys) => {
        if (err) {
            console.error('Erreur Redis:', err);
            res.status(500).json({ message: 'Erreur lors de la récupération des données dans Redis' });
        } else {
            const all_data = {};

            for (const key of keys) {
                const value = await client.get(key);
                all_data[key] = value;
            }

            res.status(200).json(all_data);
        }
    });
});

// Lancement du serveur
app.listen(port, () => {
    console.log(`Exemple app listening at http://localhost:${port}`);
});
