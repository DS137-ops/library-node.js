const authmodel = require('../models/auth.model')

exports.getregisterpage = (req, res, next) => {
    res.render('register', { verifUser: req.session.userid, message: req.flash('error')[0] })
}

exports.postregisterdata = (req, res, next) => {

    authmodel.registerfunctionmodel(req.body.name, req.body.email, req.body.password).then(() => {
        res.redirect("/login")
    }).catch(err => {
        req.flash('error', err)
        res.redirect('/register')
    })
}

exports.logoutfunction = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/login')

    })
}