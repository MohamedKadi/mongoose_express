const mongoose = require('mongoose');
const Product = require('./models/product');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
    console.log('db is connected');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// const p = new Product({
//     name: 'lesieur',
//     price: 20,
//     category: 'oils',
// })
// p.save().then(p => {
//     console.log(p,' added succefully');
// }).catch(e =>{
//     console.log("OPS ", e);
// })

// const docs = ([
//     { name: 'bimo', price: 2, category: "bimos" },
//     { name: 'maticha', price: 5, category: "vegetable" },
//     { name: 'bsla', price: 3, category: "vegetable" },
//     { name: 'orange', price: 15, category: "fruit" }, 
//   ]);
// Product.insertMany(docs)
// .then(data => {
//     console.log(data);
// })
// .catch(e => {
//     console.log(e);
// })