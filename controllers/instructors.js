const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')

exports.index = (req, res) => {
    return res.redirect('instructors')
}

exports.details = (req, res) => {
    return res.render('instructors/index', { instructors: data.instructors })
}

exports.post = (req, res) => {
    const keys = Object.keys(req.body)

    for(key of keys) {
        if (req.body[key] == "")
            return res.send("Todos os campos dever ser preenchidos.")
    }

    let { 
        avatar_url, 
        birth,
        name,
        services,
        gender
    } = req.body

    const id = Number(data.instructors.length + 1)
    const created_at = Date.now()
    birth = Date.parse(req.body.birth)

    data.instructors.push({
        id,
        avatar_url, 
        name,
        birth,
        created_at,
        gender,
        services
    })

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err)
            return res.send('Write file error!')
        
        return res.redirect('/instructors/create')
    })
}

exports.show = (req, res) => {
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
}

exports.edit = (req, res) => {
    const { id } = req.params

    const foundIntructor = data.instructors.find((instructor) => {
        return instructor.id == id
    })

    if (!foundIntructor)
        return res.send('Instructor not found!')

    const instructor = {
        ...foundIntructor,
        birth: date(foundIntructor.birth)
    }
    
    return res.render('instructors/edit', { instructor: instructor })
}

exports.put = (req, res) => {
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
}

exports.delete = (req, res) => {
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
}

exports.create = (req, res) => {
    return res.render('instructors/create')
}

