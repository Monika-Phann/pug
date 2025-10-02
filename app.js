const express = require('express');
const path = require('path');

const app = express();

const errorController = require('./controllers/error');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes); // shopRoutes mounted at '/' 

// 404 page
app.use(errorController.get404);

app.listen(3000, () => console.log('Server running on port 3000'));
