const Product = require('../models/product');
const Cart=require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products=>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(err=>{
    console.log(err);
  });
};

exports.getProduct=(req,res,next)=>{
  // req gives access yo req.params
  const prodId=req.params.productId;
  // Product.findAll({where: { id: prodId}})
  //   .then(products=>{
  //     res.render('shop/product-detail',{
  //       product : products[0],
  //       pageTitle : products[0].title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err=>{
  //   console.log(err);
  // })
  Product.findByPk(prodId)
  .then(product=>{
    res.render('shop/product-detail',{
      product : product,
      pageTitle : product.title,
      path: '/products'
    });
  })
  .catch(err=>{
    console.log(err)
  });
  
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(products=>{
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(err=>{
    console.log(err);
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart=(req,res,next)=>{
  const prodId=req.body.productId;
  Product.findByPk(prodId,(product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
