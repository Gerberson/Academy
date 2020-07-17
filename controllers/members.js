exports.index = (req, res) => {
    return res.send('initial')
}

exports.details = (req, res) => {
    return res.send('index')
}

exports.post = (req, res) => {
    return res.send('post')
}

exports.show = (req, res) => {
    return res.send('show')
}

exports.edit = (req, res) => {
    return res.send('edit')
}

exports.put = (req, res) => {
    return res.send('put')
}

exports.delete = (req, res) => {
    return res.send('delete')
}

exports.create = (req, res) => {
    return res.send('create')
}