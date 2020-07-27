const Member = require('../models/member')
const { age, date } = require('../../lib/utils')

module.exports = {
    index(req, res) {
        return res.redirect('members')
    },
    details(req, res) {
        Member.all((members) => {
            return res.render('members/index', { members })
        })
    },
    create(req, res) {
        Member.getInstructors((instructors) => {
            return res.render('members/create', { instructors })
        })
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for(key of keys) {
            if (req.body[key] == "")
                return res.send("Todos os campos dever ser preenchidos.")
        }
        
        Member.create(req.body, (member) => {
            return res.redirect(`/members/${member.id}`)
        })

        return
    },
    show(req, res) {
        Member.find(req.params.id, (member) => {
            if (!member) 
                return res.send('member not found!')
            
            member.age = age(member.birth),
            member.created_at = date(member.created_at).format
                
            return res.render('members/show', { member })
        })
    },
    edit(req, res) {
        
        Member.find(req.params.id, (member) => {
            if (!member) 
                return res.send('member not found!')
            
            member.birth = date(member.birth).iso

            Member.getInstructors((instructors) => {
                return res.render('members/edit', { member, instructors })
            })
        })    
    },
    put(req, res) {
        const keys = Object.keys(req.body)
    
        for(key of keys) {
            if (req.body[key] == '')
                return res.send('Please, fill all fields')
        }
        

        Member.update(req.body, (member) => {
            return res.redirect(`members/${req.body.id}`)
        })
    },
    delete(req, res) {
        Member.delete(req.body.id, (member) => {
            return res.redirect(`members`)
        })
    },
}