// Creo una costante che prende come valore il package express
const express = require('express');
// Ripeto la stessa operazione per le altre librerie
// NB: per le libreris installate con npm install, fra apici si scrive solo il nomde della 
// libreria (nome usato con npm) senza specificare il percorso
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Import di oggetti/funzioni dichiarate in altri file 
// Per i nostri oggetti/ funzioni è neccessario dicihiarare 
// il pecorso 
const config = require('./config')


// Creo l'applicazione express
const app = express();

// Aggiungo moduli middleware alla catena di elaborazione
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Aggiungo libreria CORS:  Aggiunge nell'intestazione della response 
// Una riga che consente ad applicazioni ospitate su altri domini di accedere al webservice 
app.use(cors())


//Publico il sito web di help contenuto nella cartella chiamata public 
app.use('', express.static('public'))

//Implemento il metodo per l'inizializzazione dei database 
app.post('/init', (request, response) => {
    //Funzione di callback mandata in esecuzione quando un cliente invia una richiesta per le URL 
    //https://localhost:4444/init con metodo POST 
    let secret = request.body.secret; 

    if(secret === config.initSecret){
        //Inizializzp il DB 
        response.status(200).send('Database inizializzato')
    
    }
    else{
        //Mandiamo al client un messaggio di accesso non autorizzato 
        //Quando nella catena di esecuzione di express si trova .send, 
        //ogni altra istruzione viene introdotta 
        response.status(403).send('Secret non presete o errata')
    }
})

//..implemento metodi crud 

//Metto in ascoloto la mia applicazione express sulla porta scelta per il webservice 4444
 
const server = app.listen(config.port, () => {
    console.log('Server in ascolto sulla porta' + config.port)
})