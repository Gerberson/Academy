const db = require('../../config/db')

module.exports = {
    async seedInstructors() {
        const queryAll = `SELECT * FROM instructors;`

        const registros = await db.query(queryAll)
        .then((results) => {
            return results.rowCount
        })
        .catch((err) => {
            throw `Database Error! ${err}`
        })

        if (registros == 31)
        {
            const queryDelete = `DELETE FROM instructors;`

            await db.query(queryDelete)
            .then((results) => {})
            .catch((err) => {
                throw `Database Error! ${err}`
            })
        }

        if (registros == 0 || registros == 31)
        {
            const queryInsert = `INSERT INTO 
                instructors(name, avatar_url, gender, services, birth, created_at) 
                values ('Renato Silva', 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80', 'M', 'Musculação, Judo, Runing','1960-01-14', '2020-11-25'),
                ('Valeria Rocha', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80', 'F', 'Ginastica, Dance, Yoga','1961-01-15', '2020-11-25'),
                ('Pedro Valente', 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80', 'M', 'Yoga, CrossFit, Funcional','1962-01-16', '2020-11-25'),
                ('Camila Assunção', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80', 'F', 'Jump, Rit, Funcional','1963-01-17', '2020-11-25'),
                ('Flora Alves', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80', 'F', 'CrossFit, Krav Maga, Judo','1970-01-18', '2020-11-25'),
                ('Eduardo Pereira', 'https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80', 'M', 'Rit, Judo, Runing','1971-01-19', '2020-11-25'),
                ('Fernanda Santos', 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80', 'F', 'Dance, Yoga, Ginastica','1972-01-20', '2020-11-25'),
                ('Gloria Maria', 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80', 'F', 'Runing, Musculação, Rit','1985-01-21', '2020-11-25'),
                ('João Azevedo', 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80', 'M', 'Judo, Dance, CrossFit','1986-01-22', '2020-11-25'),
                ('Floriano Aguiar', 'https://images.unsplash.com/photo-1483721310020-03333e577078?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80', 'M', 'Krav Maga, Rit, Jump','1987-01-23', '2020-11-25');
            `
            
            return await db.query(queryInsert)
            .then((results) => {
                return results.rows
            })
            .catch((err) => {
                throw `Database Error! ${err}`
            })
        }
    },
    async seedMembers() {
        const queryAll = `SELECT * FROM members;`

        const registros = await db.query(queryAll)
        .then((results) => {
            return results.rowCount
        })
        .catch((err) => {
            throw `Database Error! ${err}`
        })

        if (registros == 31)
        {
            const queryDelete = `DELETE FROM members;`

            await db.query(queryDelete)
            .then((results) => {})
            .catch((err) => {
                throw `Database Error! ${err}`
            })
        }

        if (registros == 0 || registros == 31)
        {
            const queryInsert = `INSERT INTO 
                members(name, avatar_url, email, gender, birth, blood, weight, height, created_at, instructor_id) 
                values 
                ('Leo Silva', 'https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=402&q=80', 'leo@gmail.com', 'M', '1960-01-14', 'A+', 88, 100, '2020-11-25', 0),
                ('Solange Prado', 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80', 'solange@gmail.com', 'F', '1961-01-15', 'A+', 88, 100, '2020-11-25', 0),
                ('Henrique Fonceca', 'https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=512&q=80', 'henrique@gmail.com', 'M', '1962-01-16', 'A+', 88, 100, '2020-11-25', 0),
                ('Flavio Dias', 'https://images.unsplash.com/photo-1482235225574-c37692835cf3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80', 'flavio@gmail.com', 'F', '1963-01-17', 'A+', 88, 100, '2020-11-25', 0),
                ('Maria José', 'https://images.unsplash.com/photo-1506956191951-7a88da4435e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80', 'maria@gmail.com', 'F', '1970-01-18', 'A+', 88, 100, '2020-11-25', 0),
                ('Ana Julia', 'https://images.unsplash.com/photo-1509955252650-8f558c2b8735?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=333&q=80', 'ana@gmail.com', 'M', '1971-01-19', 'A+', 88, 100, '2020-11-25', 0),
                ('Julia Souza', 'https://images.unsplash.com/photo-1450297350677-623de575f31c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80', 'julia@gmail.com', 'F', '1972-01-20', 'A+', 88, 100, '2020-10-25', 0),
                ('Wagner Moura', 'https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=367&q=80', 'wagner@gmail.com', 'F', '1985-01-21', 'A+', 88, 100, '2020-11-25', 0),
                ('Sofia Lima', 'https://images.unsplash.com/photo-1504933350103-e840ede978d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=282&q=80', 'sofia@gmail.com', 'M', '1986-01-22', 'A+', 88, 100, '2020-11-25', 0),
                ('Enzo Soares', 'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80', 'enzo@gmail.com', 'M','1987-01-23', 'A+', 88, 100, '2020-11-25', 0);
            `
            
            return await db.query(queryInsert)
            .then((results) => {
                return results.rows
            })
            .catch((err) => {
                throw `Database Error! ${err}`
            })
        }
    }
}