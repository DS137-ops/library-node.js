const { response } = require('express');
const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    author: String,
    image: String,
    userid:String
});
var Book = mongoose.model('book', bookSchema), url = "mongodb://localhost:27017/library";



exports.homeThreeBooks = (req, res, next) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            return Book.find({}).limit(3)
        }).then(books => {
            mongoose.disconnect();
            resolve(books);
        }).catch(err => reject(err))
    })

}
// exports.getdatadetails = (idu)=>{
//      return new Promise((resolve, reject) => {
//        mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true}).then(()=>{
//             return Book.findById(idu)
//         }).then(resp=>{
//             mongoose.disconnect();
//             resolve(resp);
//         }).catch(err=>reject(err))
//     })
// }
exports.getAllBooks = (req, res, next) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, }).then(() => {
            return Book.find({})
        }).then(books => {
           
            mongoose.disconnect();
            resolve(books);
            
           
        }).catch(err => reject(err))
    })
}
exports.postaddnewbook=(title,description,price,author,image,userid)=>{
  return new Promise((resolve, reject) => {
    mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        let newbook=new Book({
            title:title,
            description:description,
            price:price, 
            author:author,
            image:image,
            userid:userid
        })
        return newbook.save()
    }).then(()=>{
        mongoose.disconnect()
        resolve('added')
    }).catch((err)=>{
        mongoose.disconnect()
        reject(err)
    })
  })
  }

  exports.getonebookdetails = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, }).then(() => {
            return Book.findById(id)
        }).then(books => {
            mongoose.disconnect();
            resolve(books);
        }).catch(err => reject(err))
    })
}

exports.getmybooks = (userid)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(url,{useNewUrlParser:true , useUnifiedTopology:true}).then(()=>{
            return Book.find({userid:userid})
        }).then((mybooks)=>{
            mongoose.disconnect()
            resolve(mybooks)
        }).catch((err)=>{
            reject(err)
        })
    })
}

exports.deletethebook = (id)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(url,{useNewUrlParser:true , useUnifiedTopology:true}).then(()=>{
            return Book.deleteOne({_id:id})
        }).then((mybooks)=>{
            mongoose.disconnect()
            resolve(true)
        }).catch((err)=>{
            reject(err)
        })
    })
}




exports.bookinfo = (id)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(url,{useNewUrlParser:true , useUnifiedTopology:true}).then(()=>{
            return Book.findById(id)
        }).then((bookinfo)=>{
            mongoose.disconnect()
            resolve(bookinfo)
        }).catch((err)=>{
            reject(err)
        })
    })
}


exports.updatethisbook = (bookid,title,description,price,author,image,userid)=>{
    return new Promise((resolve, reject) => {
        mongoose.connect(url,{useNewUrlParser:true , useUnifiedTopology:true}).then(()=>{
            return Book.updateOne({_id:bookid},{title:title,description:description,price:price,author:author,image:image,userid:userid})
        }).then(()=>{
            mongoose.disconnect()
            resolve('updated')
        }).catch((err)=>{
            reject(err)
        })
    })
}
