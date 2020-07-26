const member = require('../models/member')
const { age, date } = require('../../lib/utils')

module.exports = {
    index(req, res) {
        return res.redirect('members')
    },
    details(req, res) {
        member.all((members) => {
            return res.render('members/index', { members })
        })
    },
    create(req, res) {
        return res.render('members/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "")
                return res.send("Todos os campos dever ser preenchidos.")
        }
        
        member.create(req.body, (member) => {
            return res.redirect(`/members/${member.id}`)
        })

        return
    },
    show(req, res) {
        member.find(req.params.id, (member) => {
            if (!member) 
                return res.send('member not found!')
            
            member.age = age(member.birth),
            member.created_at = date(member.created_at).format
                
            return res.render('members/show', { member })
        })
    },
    edit(req, res) {
        
        member.find(req.params.id, (member) => {
            if (!member) 
                return res.send('member not found!')
            
            member.birth = date(member.birth).iso
                
            return res.render('members/edit', { member })
        })    
    },
    put(req, res) {
        const keys = Object.keys(req.body)
    
        for(key of keys) {
            if (req.body[key] == '')
                return res.send('Please, fill all fields')
        }
        

        member.update(req.body, (member) => {
            return res.redirect(`members/${req.body.id}`)
        })
    },
    delete(req, res) {
        member.delete(req.body.id, (member) => {
            return res.redirect(`members`)
        })
    },
}