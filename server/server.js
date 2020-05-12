require('./config/config')

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')))

//configuracion global de rutas
app.use(require('./routes/index'))


mongoose.connect(process.env.URLDB, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('base de datos ONLINE');
})
.catch(err => {
    console.log('base de datos not connected', err);
})

app.listen(process.env.PORT, () => {
    console.log("escuchando peuerto: ", process.env.PORT);
    
})