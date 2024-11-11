const mongoose = require('mongoose'),
    url = "mongodb://localhost:27017/library",
    bcrypt = require("bcrypt")
var schemaAuth = mongoose.Schema({
    name: String,
    email: String,
    password: String
})
var User = mongoose.model('user', schemaAuth)

exports.registerfunctionmodel = (name, email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return User.findOne({ email: email })
        }).then((user) => {
            if (user) {
                mongoose.disconnect()
                reject('email exists!')
            } else {
                return bcrypt.hash(password, 10)
            }
        }).then((hpassword) => {
            let user = new User({
                name: name,
                email: email,
                password: hpassword

            })
            return user.save()
        }).then((user) => {
            mongoose.disconnect()
            resolve('registered')
        }).then((err) => {
            mongoose.disconnect()
            reject(err)
        }).catch(err => { console.log(err) })
    })
}



exports.loginfunctionmodel = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            var x = User.findOne({ email: email })

            return x
        }).then((user) => {
            if (user) {
                bcrypt.compare(password, user.password).then((verif) => {
                    if (verif) {
                        mongoose.disconnect()
                        resolve(user._id)
                    }
                    else {
                        mongoose.disconnect()
                        reject("Invalid Password")
                    }
                })
            }
            else {
                mongoose.disconnect()
                reject("Invalid Email")
            }
        }).catch((err) => {
            reject(err)
        })
    })
}



// exports.getuserinfo = (id) => {
//     return new Promise((resolve, reject) => {
//         mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, }).then(() => {
//             return User.findOne(id)
//         }).then(info => {
//             mongoose.disconnect()
//             resolve(info)
//         }).catch(err => reject(err))
//     })
// }