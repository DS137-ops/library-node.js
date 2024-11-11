const Bookmodel = require('../models/book.model')
const authmodel = require('../models/auth.model');

exports.bookAllController = (req, res, next) => {
    Bookmodel.getAllBooks().then(books => {
       
            res.render("books", { books: books, verifUser: req.session.userid })
      
    })
}
exports.getaddbookpage = (req, res, next) => {
     res.render('addbook', { verifUser: req.session.userid ,smessage:req.flash("successmessage")[0] , emessage:req.flash("errormessage")[0] })

   
}
exports.postaddbookcontroller = (req, res, next) => {
    Bookmodel.postaddnewbook(req.body.title,req.body.description,req.body.price,req.body.author , req.file.filename,req.session.userid).then((msg)=>{
        res.redirect('/mybooks')
    }).catch((err)=>{
        req.flash("errormessage",err)
        res.redirect('/addbook')

    })
}

exports.getOneBookdetailsController = (req,res,next)=>{
    Bookmodel.getonebookdetails(req.params._id).then((books)=>{
        res.render("details",{books:books , verifUser:req.session.userid })
    })
}

exports.getmybookspage=(req,res,next)=>{
    Bookmodel.getmybooks(req.session.userid).then((mybooks)=>{
        res.render('mybooks',{verifUser:req.session.userid , mybooks:mybooks})
    })
}

exports.deletebook=(req,res,next)=>{
    let id=req.params.idb
    Bookmodel.deletethebook(id).then((verif)=>{
res.redirect('/mybooks')
    }).catch((err)=>{
        console.log(err)
    })
}

exports.getupdatepage = (req,res,next)=>{
    Bookmodel.bookinfo(req.params.idu).then((info)=>{
        res.render('update',{verifUser:req.session.userid,info:info})
    })
}

exports.postupdatebook = (req,res,next)=>{
    if(req.file){
        Bookmodel.updatethisbook(req.body.bookid,req.body.title,req.body.description,req.body.price,req.body.author , req.file.filename,req.session.userid).then(()=>{
            console.log(req.body.bookid)
            res.redirect(`/mybooks`)
        }).catch((err)=>{
            console.log(err)
        })
    }
    else {
        Bookmodel.updatethisbook(req.body.bookid,req.body.title,req.body.description,req.body.price,req.body.author , req.body.oldimage,req.session.userid).then(()=>{
            res.redirect(`/mybooks/update/${req.body.bookid}`)
        }).catch((err)=>{
            console.log(err)
        })
    }
   
}