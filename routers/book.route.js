
const bookcontroller = require("../controllers/book.controller")

const router = require("express").Router();
const GuardAuth = require('./guardAuth')
const multer = require('multer')
router.get('/', GuardAuth.isAuth, bookcontroller.bookAllController);
router.get('/' , bookcontroller.getOneBookdetailsController);
router.get('/addbook', GuardAuth.isAuth, bookcontroller.getaddbookpage)
router.post('/addbook', multer({
    storage : multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,'assets/uploads')
        },
        filename:function(req,file,cb){
            cb(null,Date.now()+'.'+file.originalname)
        }
    })
}).single(["image"]),bookcontroller.postaddbookcontroller)


module.exports = router;