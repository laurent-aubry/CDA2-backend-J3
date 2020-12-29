const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const musiquesRoutes = require('./routes/musiques-routes')
const HttpError = require('./models/http-error');

const app=express()

// Traitement des méthodes POST au format JSON
app.use(bodyParser.json())

app.use('/api/musiques', musiquesRoutes)

//Gestion du router si aucune route prélable n'est trouvée (en dernier)
//penser à ajouter le HttpError 
//dans ce cas l'erreur est passée au middleware suivant en charge de la gestion des erreurs
app.use((req, res, next) => {
    const error = new HttpError('Page non trouvée', 404);
    next(error); //throw(error)
});

//Middleware de Gestion d'erreur fourni par Express
//Lorsque 4 arguments sont passés, Express reconnait le 1er argument comme étant une erreur (overloading)
//ce code ne s'exécute qu'en cas d'erreur de routage
app.use((error, req, res, next) => {
    if (res.headerSent) { //vérifier si la réponse a terminé / a été retournée
        return next(error);
    }
    res.status(error.code || 500); //vérifier si un code erreur spécifique a été généré par le router
    res.json({ message: error.message || 'Une erreur non gérée est survenue' })
});

//************************************** */
//Connection au serveur de données MongoDB
//************************************** */

//Paramètre de la Connection string
const uri = `mongodb+srv://gretaUser:sUPXIReA7FnjdSQZ@cluster0.ncwlp.mongodb.net/Greta?retryWrites=true&w=majority`

const options = {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true}

//Etablissement de la connection
mongoose.connect(uri, options)
  .then(() => {
    app.listen(process.env.PORT || 5000, console.log('Server is running'));
  })
  .catch(err => {
    console.log(err);
  });

