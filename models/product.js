const fs = require('fs');
const path = require('path');

    const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
        
module.exports = class Product {
    constructor (t){
        this.title = t;
    }

    save() { //save is the function without writing function
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) { // static = the keyword which make sure that we can tell this method directly on the class itself and not on an instantiated object
        getProductsFromFile(cb);
    }
};
