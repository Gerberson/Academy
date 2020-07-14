const fs = require('fs')
const data = require('../data.json')

exports.post = (req, res) => {
    const keys = Object.keys(req.body)

    for(key of keys) {
        if (req.body[key] == "")
            return res.send("Todos os campos dever ser preenchidos.")
    }

    req.body.created_at = Date.now()
    req.body.birth = Date.parse(req.body.birth)

    data.instructors.push(req.body)

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err)
            return res.send('Write file error!')
        
        return res.redirect('/instructors')
    })
}
