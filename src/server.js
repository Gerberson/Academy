const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const { urlencoded } = require('express')
const methodOverride = require('method-override')
const dotenv = require('dotenv')

const server = express()

//MIDDLEWARE
server.use(urlencoded({ extended : true }))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

//CONFIGURAÇÃO DO NUNJUCKS
server.set('view engine', 'njk')

nunjucks.configure('src/app/views', {
    express: server,
    autoescape: false,
    noCache: true
})

const PORT = process.env.PORT || 8877

//SERVINDO A PORTA
server.listen(PORT, () => console.log("server is running"))