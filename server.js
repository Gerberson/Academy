const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')

const server = express()

//MIDDLEWARE
server.use(express.static('public'))
server.use(routes)

//CONFIGURAÇÃO DO NUNJUCKS
server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})

//SERVINDO A PORTA
server.listen(5000, () => console.log("server is running"))