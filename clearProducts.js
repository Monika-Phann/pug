const fs = require('fs');
const path = require('path');

// Path to products.json
const p = path.join(__dirname, 'data', 'products.json');

// Overwrite with an empty array
fs.writeFile(p, '[]', (err) => {
  if (err) {
    console.log('Error clearing products.json:', err);
  } else {
    console.log('products.json cleared successfully!');
  }
});
