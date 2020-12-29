const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const musiquesRoutes = require('./routes/musiques-routes')

const app=express()

// Traitement des méthodes POST au format JSON
app.use(bodyParser.json())

app.use('/api/musiques', musiquesRoutes)

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

