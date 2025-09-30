const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Set Pug as the view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

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
