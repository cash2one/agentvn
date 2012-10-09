exports.action = function (req, res) {
    delete req.session.user
    res.redirect('/login')
}