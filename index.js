const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejs = require('ejs');
const methodOverride = require('method-override')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(methodOverride('_method'));

const Product = require('./models/product');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
  console.log('db is connected');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/products', async (req,res)=>{
    const products = await Product.find({});
    res.render('products/index',{products: products});
})
app.get('/products/new',(req,res) => {
  res.render('products/new');
})
app.post('/products', async(req,res)=>{
  const {name , price, category} = req.body;
  const newProduct = await Product.create({name: name, price: price, category:category});
  res.redirect('products');
  // const {name, price, category} = req.body;
  // res.redirect('products');
})
app.get('/products/:id', async (req,res)=>{
  const {id} = req.params;
  const product = await Product.findById(id);
  res.render('products/show',{product: product});
})
app.get('/products/:id/edit', async (req,res)=>{
  const {id} = req.params;
  const product = await Product.findById(id);
  res.render('products/edit',{product: product});
})
app.put('/products/:id', async (req,res)=>{
  const {id} = req.params;
  const product = await Product.findByIdAndUpdate(id,req.body,{runValidators: true, new: true});
  console.log(product);
  res.redirect('/products/'+product._id);
})


app.listen(3000, ()=>{
    console.log("APP IS LISTENING ON PORT 3000");
})