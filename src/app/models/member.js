const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback) {
        db.query('SELECT * FROM members ORDER BY id DESC', (err, results) => {
            if(err) 
                throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO 
                members (name, avatar_url, email, gender, birth, blood, weight, height, created_at, instructor_id)
                values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            data.email,
            data.gender,
            date(data.birth).iso,
            data.blood,
            data.weight,
            data.height,
            date(Date.now()).iso,
            data.instructor
        ]

        db.query(query, values, (err, results) => {
            if(err)
                throw `Database Error! ${err}`

            callback(results.rows[0])
        })

    },
    find(id, callback) {
        const query = `
                SELECT members.*, instructors.name AS instructor_name
                FROM members 
                LEFT JOIN instructors ON (members.instructor_id = instructors.id)
                WHERE members.id = $1
            `
        
        db.query(query, [id], (err, results) => {
            if(err) 
                throw `Database Error! ${err}`
            
            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
            UPDATE members SET
                name=($1),
                avatar_url=($2),
                email=($3),
                gender=($4),
                birth=($5),
                blood=($6),
                weight=($7),
                height=($8),
                instructor_id=($9)
            WHERE id = $10
        `

        const values = [
            data.name,
            data.avatar_url,
            data.email,
            data.gender,
            date(data.birth).iso,
            data.blood,
            data.weight,
            data.height,
            data.instructor,
            data.id
        ]

        db.query(query, values, (err, results) => {
            if(err) throw `Database Error! ${err}`
        
            callback()
        })
    },
    delete(id, callback) {
        const query = `
            DELETE FROM members WHERE id = $1
        `
        
        db.query(query, [id], (err, results) => {
            if(err) throw `Database Error! ${err}`
        
            callback()
        })
    },
    getInstructors(callback) {
        const query = `SELECT id, name FROM instructors`

        db.query(query, (err, results) => {
            if(err) throw 'Database Error!'

            callback(results.rows)
        })
    }
}