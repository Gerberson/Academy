const fs = require('fs')
const data = require('../../../data.json')
const { age, date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    index(req, res) {
        return res.redirect('instructors')
    },
    details(req, res) {
        return res.render('instructors/index', { instructors: data.instructors })
    },
    create(req, res) {
        return res.render('instructors/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "")
                return res.send("Todos os campos dever ser preenchidos.")
        }
        
        const query = `
            INSERT INTO 
                instructors (name, avatar_url, gender, services, birth, created_at)
                values ($1, $2, $3, $4, $5, $6)
                RETURNING id
        `

        const values = [
            req.body.name,
            req.body.avatar_url,
            req.body.gender,
            req.body.services,
            date(req.body.birth).iso,
            date(Date.now()).iso
        ]

        db.query(query, values, (err, result) => {
            if(err) res.send('Database Error')

            return res.redirect(`/instructors/${result.rows[0].id}`)
        })

        return
    },
    show(req, res) {
        const { id } = req.params

        const foundIntructor = data.instructors.find((instructor) => {
            return instructor.id == id
        })
    
        if (!foundIntructor)
            return res.send('Instructor not found!')
    
        const instructor = {
            ...foundIntructor,
            age: age(foundIntructor.birth),
            services: foundIntructor.services.split(','),
            created_at: new Intl.DateTimeFormat("pt-BR").format(foundIntructor.created_at)
        }
    
        return res.render('instructors/show', { instructor: instructor })
    },
    edit(req, res) {
        const { id } = req.params

        const foundIntructor = data.instructors.find((instructor) => {
            return instructor.id == id
        })
    
        if (!foundIntructor)
            return res.send('Instructor not found!')
    
        const instructor = {
            ...foundIntructor,
            birth: date(foundIntructor.birth).iso
        }
        
        return res.render('instructors/edit', { instructor: instructor })
    },
    put(req, res) {
        const { id } = req.body

        let index = 0
        const foundIntructor = data.instructors.find((instructor, foundIndex) => {
            if (instructor.id == id) {
                index = foundIndex
                return true
            }
        })
    
        if (!foundIntructor)
            return res.send('Instructor not found!')
    
        const instructor = {
            ...foundIntructor,
            ...req.body,
            birth: Date.parse(req.body.birth),
            id: Number(req.body.id)
        }
    
        data.instructors[index] = instructor
    
        fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
            if (err)
                return res.send("Write error")
            
            return res.redirect(`/instructors/${id}`)
        })
    },
    delete(req, res) {
        const { id } = req.body
    
        const filteredIntructors = data.instructors.filter((instructor) => {
            return instructor.id != id
        })
    
        data.instructors = filteredIntructors
    
        fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
            if (err)
                return res.send('Write file error!')
            
            return res.redirect('/instructors')
        })
    },
}