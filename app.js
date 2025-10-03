const express = require('express');
const path = require('path');
const Cart = require('./models/cart');

const app = express();
const errorController = require('./controllers/error');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// --- Safe middleware: run BEFORE routes so views can use cartTotal ---
app.use((req, res, next) => {
  // defensively call getCart and always next()
  try {
    Cart.getCart(cart => {
      // if getCart returns something unexpected, fall back to zero
      res.locals.cartTotal = (cart && typeof cart.totalPrice === 'number') ? cart.totalPrice : 0;
      next();
    });
  } catch (err) {
    // don't crash the app for any reason — provide a safe default
    console.error('Error in cart middleware:', err);
    res.locals.cartTotal = 0;
    next();
  }
});

// Import routes after middleware so they have access to res.locals.cartTotal
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 page
app.use(errorController.get404);

app.listen(3000, () => console.log('Server running on port 3000'));
