const bookmodel = require('../models/book.model');
const authmodel = require('../models/auth.model');

exports.homeThreeController = (req, res, next) => {
    bookmodel.homeThreeBooks().then(books => {
            res.render("index", { books: books, verifUser: req.session.userid})
    })

}

