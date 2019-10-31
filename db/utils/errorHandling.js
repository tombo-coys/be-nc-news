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
    } else if (err.code === '23503') {
        const message = err.message.split(' - ');
        const error = {
            status: 404,
            msg: message[1]
        }
        res.status(404).json(error)
    } else if (err.code === '42703' && err.routine !== 'errorMissingColumn') {
        const message = err.message.split(' - ');
        const error = {
            status: 400,
            msg: message[1]
        }
        res.status(400).json(error)
    } else if (err.code === '42703') {
        const message = err.message.split(' - ');
        const error = {
            status: 404,
            msg: message[1]
        }
        res.status(404).json(error)
    } else next(err)
}

const allOtherErrors = (err, req, res, next) => {
console.log(err)
    console.log('in all other errors and something has gone very wrong!')
    res.status(500).json({msg : 'arrrrhg'})

}



module.exports = { methodNotAllowed, customErrors, psqlErrors, allOtherErrors }