const express = require('express')
const routes = express.Router()
const instructors = require('./app/controllers/instructors')
const members = require('./app/controllers/members')

routes.get('/', instructors.index)
routes.get('/instructors', instructors.details)
routes.get('/teste', (req, res) => {
    res.send("ROTA TESTE OK!!")
})
routes.get('/instructors/create', instructors.create)
routes.get('/instructors/:id', instructors.show)
routes.get('/instructors/:id/edit', instructors.edit)
routes.post('/instructors', instructors.post)
routes.put('/instructors', instructors.put)
routes.delete('/instructors', instructors.delete)

routes.get('/members', members.details)
routes.get('/members/create', members.create)
routes.get('/members/:id', members.show)
routes.get('/members/:id/edit', members.edit)
routes.post('/members', members.post)
routes.put('/members', members.put)
routes.delete('/members', members.delete)

module.exports = routes