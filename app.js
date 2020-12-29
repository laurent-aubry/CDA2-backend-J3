const express = require('express')
const bodyParser = require('body-parser')

const musiquesRoutes = require('./routes/musiques-routes')

const app=express()

app.use('/api/musiques', musiquesRoutes)

app.listen(5000);