const authmodel = require('../models/auth.model')

exports.getloginpage = (req, res, next) => {
    res.render("login", { verifUser: req.session.userid, message: req.flash('error')[0] })
}
exports.postlogindata = (req, res, next) => {

    // authmodel.loginfunctionmodel( req.body.email,req.body.password).then((id)=>{

    //     req.session.userid=id
    // }).then(user=>{
    //     res.redirect("/",{user:user})
    // }).catch((err)=>{
    //     console.log(err)
    // })
    authmodel.loginfunctionmodel(req.body.email, req.body.password).then((id) => {
        req.session.userid = id
        res.redirect("/")
    }).catch((err) => {
        req.flash('error', err)
        res.redirect('/login')

    })
}

exports.logoutfunction = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
}
exports.getcontactpage = (req, res, next) => {

    res.render("contact", { verifUser: req.session.userid })
}