const fs = require('fs')
const data = require('../data.json')

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

    return res.send(foundIntructor)
}