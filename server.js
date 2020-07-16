const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const { urlencoded } = require('express')
const methodOverride = require('method-override')

const server = express()

//MIDDLEWARE
server.use(urlencoded({ extended : true }))
server.use(express.static('public'))
server.use(methodOverride('_method'))
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