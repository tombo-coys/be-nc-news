const methodNotAllowed = (req, res, next) => {
    const method = req.method
    res.status(405).json({ msg: `${method} method denied` })
}


const customErrors = (err, req, res, next) => {
    res.status(404).json(err)
}

module.exports = { methodNotAllowed, customErrors }