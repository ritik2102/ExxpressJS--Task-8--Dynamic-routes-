const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
// importing sequelize
const sequelize=require('./util/database');

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

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// it syncs the models to the database by creating the tables
sequelize
    .sync()
    .then(result=>{
        // console.log(result);
        // We only start the server if we somehow made it upto here
        app.listen(3000);
    })
    .catch(err=>{
        console.log(err);
    });


