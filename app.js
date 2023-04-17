const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
// importing sequelize
const sequelize=require('./util/database');

const Product=require('./models/product');
const User=require('./models/user');
const Cart=require('./models/cart');
const CartItem=require('./models/cart-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Since we are recieving a promise, we will go for then and catch
// db.end() is used when we want to shut off our application
// db.end();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// the middleware is executed only for an incoming request
app.use((req,res,next)=>{
    User.findByPk(1)
    .then(user=>{
        // we are setting the request user for any incoming request
        req.user=user;
        next();
    })
    .catch(err=> console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Product.belongsTo-A user created this product
// CASCADE defines that if a user is deleted, the same would be done for product
Product.belongsTo(User,{constraints: true, onDelete: 'CASCADE'});
// Signifies that One user has many products
User.hasMany(Product);
User.hasOne(Cart);
// The below line of code is optional
Cart.belongsTo(User);

// Many to many relationship
Cart.belongsToMany(Product,{ through: CartItem});
Product.belongsToMany(Cart,{ through: CartItem});
// it syncs the models to the database by creating the tables
// .sync({ force: true})overwrites the existing information if some exists and sets it according to the new format
sequelize
    .sync()
    .then(result=>{
        return User.findByPk(1);
    })
    .then(user=>{
        if(!user){
            User.create({name:"Max",email:"ritik21feb@gmail.com"});
        }
        return user;
    })
    .then(user=>{
        return user.createCart();
        
    })
    .then(cart=>{
        // We only start the server if we somehow made it upto here
        app.listen(3000);
    })
    .catch(err=>{
        console.log(err);
    });


