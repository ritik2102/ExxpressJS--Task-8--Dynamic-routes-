const Product = require('../models/product');
// importing the model

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // inserting a record into our model
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
  .then(result=>{
    console.log('Created Product');
    res.redirect('/admin/products');
  }).catch(err=>{
    console.log(err);
  });
    console.log(title,imageUrl,price,description);
    res.redirect('/admin/products');
};

exports.getEditProduct = (req, res, next) => {
  // accessing the edit key from the url(if the key does not exist, then it will return the valuee of undefined)
  const editMode=req.query.edit;

  // if the value of editMode is undefined
  if(!editMode){
    return res.redirect('/');
  }
  const prodId=req.params.productId;
  Product.findByPk(prodId)
  .then(product => {
    if(!product){
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })
  .catch(err=>{
    console.log(err);
  })
};

exports.postEditProduct=(req,res,next)=>{
  const prodId=req.body.productId;
  const updatedTitle=req.body.title;
  const updatedPrice=req.body.price;
  const updatedImageUrl=req.body.imageUrl;
  const updatedDesc=req.body.description;
  Product.findByPk(prodId)
    .then(product=>{
      product.title= updatedTitle;
      product.price= updatedPrice;
      product.description= updatedDesc;
      product.imageUrl= updatedImageUrl;
      // Saves the product with updated values in the database (we return the promise from here)
      return product.save();
    })
    // this then-catch block is for the returned promise from above then
    .then(result=>{
      console.log('Updated Product!');
      res.redirect('/admin/products');
    })
    .catch(err=>{
      console.log(err);
    });
};

exports.deleteProduct=(req,res,next)=>{
  const prodId=req.params.productId;
  Product.findByPk(prodId)
    .then(product=>{
      return product.destroy();
    })
    .then(result=>{
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err=>{
      console.log(err);
    });
}

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    })
  })
  .catch(err=>{
    console.log(err);
  });
};
