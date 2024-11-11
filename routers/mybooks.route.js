const router = require('express').Router()
const bookcontroller = require("../controllers/book.controller")
const multer = require('multer')
const GuardAuth = require('./guardAuth')
const body = require('express').urlencoded({ extended: true })
router.get('/',bookcontroller.getmybookspage)
router.get('/delete/:idb',bookcontroller.deletebook)
router.get('/update/:idu',bookcontroller.getupdatepage)
router.post('/update',multer({
    storage : multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,'assets/uploads')
        },
        filename:function(req,file,cb){
            cb(null,Date.now()+'.'+file.originalname)
        }
    })
}).single(["image"]),GuardAuth.isAuth,bookcontroller.postupdatebook)
module.exports = router