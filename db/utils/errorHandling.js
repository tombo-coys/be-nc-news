const methodNotAllowed = (req, res, next) => {
    if (req.method === 'DELETE') {
        res.status(405).json({ msg: 'Delete method denied' })
    }

}


module.exports = { methodNotAllowed }