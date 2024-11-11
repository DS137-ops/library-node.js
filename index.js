const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const session = require('express-session')
const MongoStrore = require("connect-mongodb-session")(session)
const path = require('path');
app.use(express.static(path.join(__dirname , 'assets')));
app.set('view engine' , 'ejs');
app.set('views' , 'views');
const flash = require('connect-flash')
var Store = new MongoStrore({
    uri:"mongodb://localhost:27017/library",
    collection:"sessions"
})
app.use(flash())
app.use(session({
    secret:"asdkandlk",
    store:Store,
    resave:true,
    saveUninitialized:true
}))

const routerhome = require('./routers/home.route')
const routerbook = require('./routers/book.route')
const routerabout = require('./routers/about.route')
const routeregister = require('./routers/auth.route')
const routelogin = require('./routers/login.route')
const routermyboooks = require('./routers/mybooks.route')
const routercontact = require('./routers/contact.route')

// app.get('/contact' ,(req,res)=>{
//     res.render('contact');
// })
// app.get('/index' ,(req,res)=>{
//     res.render('index');
// })



// app.get('/about' , (req,res)=>{
//     res.render("about")
// })


// app.get('/login' , (req,res)=>{
//     res.render("login")
// })

// app.get('/register' , (req,res)=>{
//     res.render("register")
// })

// app.get('/addbook' , (req,res)=>{
//     res.render("addbook",{verifUser:req.session.userid
//     })
// })
app.post('/logout',(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/login')
    })
})
app.use('/register' , routeregister )
app.use('/mybooks',routermyboooks)
// app.get('/addbook',(req,res,next)=>{
//     res.render('addbook' , {verifUser:req.session.userid})
// })

app.use('/books' , routerbook )
app.use('/',routerbook)
app.use('/index' , routerhome)
app.use('/',routelogin)
app.use('/contact',routercontact)
app.use('/about',routerabout)






app.listen(3000 , ()=>{
    console.log("server is running")
})