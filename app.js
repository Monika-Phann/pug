const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');

const app = express();

// Set Pug as the view engine
app.engine('hbs', engine({extname: 'hbs'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found', layout: false });
});

app.listen(3000, () => console.log('Server running on port 3000'));
