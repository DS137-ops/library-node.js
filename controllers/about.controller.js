const aboutmodel = require('../models/auth.model');
exports.getaboutinfo = (req, res) => {
        res.render("about", { verifUser: req.session.userid })
}