const express = require('express');
const path = require('path');

const app = express();

const errorController = require('./controllers/error');

app.use(express.urlencoded({ extended: false }));


// Set Pug as the view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRouts = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouts);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000, () => console.log('Server running on port 3000'));
