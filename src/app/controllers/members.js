const data = require('../../../data.json')
const fs = require('fs')
const { age, date } = require('../../lib/utils')

module.exports = {
    details(req, res) {
        return res.render('members/index', { members: data.members })
    },
    create(req, res) {
        return res.render('members/create')
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == '') {
                return res.send('Please, fill all fields!')
            }
        }
    
        console.log(req.body)
    
        let { 
            avatar_url, 
            name, 
            email, 
            birth, 
            gender, 
            blood, 
            weight, 
            height 
        } = req.body
    
        birth = Date.parse(birth)
        const created_at = Date.now()
        
        const dataCount = data.members.length
        const id = dataCount == 0 ? 1 : dataCount + 1 
    
        data.members.push({
            id,
            created_at,
            avatar_url, 
            name, 
            email, 
            birth, 
            gender, 
            blood, 
            weight, 
            height 
        })
    
        fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
            if (err)
                return res.send('Write file error!')
            
            return res.redirect(`/members/${id}`)
        })

        return
    },
    show(req, res) {
        const { id } = req.params

        const foundMember = data.members.find((member) => {
            return member.id == id
        })
    
        if (!foundMember)
            return res.send('member not found!')
    
        const member = {
            ...foundMember,
            age: age(foundMember.birth),
            created_at: new Intl.DateTimeFormat("pt-BR").format(foundMember.created_at)
        }
    
        return res.render('members/show', { member: member })
    },
    edit(req, res) {
        const { id } = req.params

        const foundMember = data.members.find((member) => {
            return member.id == id
        })
    
        if (!foundMember)
            return res.send('Member not found!')
    
        const member = {
            ...foundMember,
            birth: date(foundMember.birth).iso
        }
    
        return res.render('members/edit', { member: member })
    },
    put(req, res) {
        const { id } = req.body

        let index = 0
        const foundMember = data.members.find((member, foundIndex) => {
            if (member.id == id) {
                index = foundIndex
                return true
            }
        })
    
        if (!foundMember)
            return res.send('member not found!')
    
        const member = {
            ...foundMember,
            ...req.body,
            birth: Date.parse(req.body.birth),
            id: Number(req.body.id)
        }
    
        data.members[index] = member
    
        fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
            if (err)
                return res.send("Write error")
            
            return res.redirect(`/members/${id}`)
        })
    },
    delete(req, res) {
        const { id } = req.body
    
        const filteredMembers = data.members.filter((member) => {
            return member.id != id
        })
    
        data.members = filteredMembers
    
        fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
            if (err)
                return res.send('Write file error!')
            
            return res.redirect('/members')
        })
    }
}