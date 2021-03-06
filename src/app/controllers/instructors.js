const instructor = require('../models/instructor')
const { age, date } = require('../../lib/utils')
const { seedInstructors } = require('../Seeding/Seeding')

module.exports = {
    index(req, res) {
        return res.redirect('instructors')
    },
    async details(req, res) {
        await seedInstructors()
        
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 5
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(instructors) {
                const pagination = {
                    total: Math.ceil(instructors[0].total / limit),
                    page
                }

                return res.render('instructors/index', { instructors, pagination, filter })
            }
        }

        instructor.paginate(params)
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
        
        instructor.create(req.body, (instructor) => {
            return res.redirect(`/instructors/${instructor.id}`)
        })

        return
    },
    show(req, res) {
        instructor.find(req.params.id, (instructor) => {
            if (!instructor) 
                return res.send('Instructor not found!')
            
            instructor.age = age(instructor.birth),
            instructor.services = instructor.services.split(','),
            instructor.created_at = date(instructor.created_at).format
                
            return res.render('instructors/show', { instructor })
        })
    },
    edit(req, res) {
        
        instructor.find(req.params.id, (instructor) => {
            if (!instructor) 
                return res.send('Instructor not found!')
            
            instructor.birth = date(instructor.birth).iso
                
            return res.render('instructors/edit', { instructor })
        })    
    },
    put(req, res) {
        const keys = Object.keys(req.body)
    
        for(key of keys) {
            if (req.body[key] == '')
                return res.send('Please, fill all fields')
        }
        

        instructor.update(req.body, (instructor) => {
            return res.redirect(`instructors/${req.body.id}`)
        })
    },
    delete(req, res) {
        instructor.delete(req.body.id, (instructor) => {
            return res.redirect(`instructors`)
        })
    }
}