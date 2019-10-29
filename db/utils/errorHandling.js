const methodNotAllowed = (req, res, next) => {
    const method = req.method
    res.status(405).json({ msg: `${method} method denied` })
}


const customErrors = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status).json(err)
    } else next(err)
}


const psqlErrors = (err, req, res, next) => {
    if (err.code === '22P02') {
        const message = err.message.split(' - ');
        const error = {
            status: 400,
            msg: message[1]
        }
        res.status(400).json(error)

    }
    else console.log('at the bottom of the PSQL error handler')
}



module.exports = { methodNotAllowed, customErrors, psqlErrors }