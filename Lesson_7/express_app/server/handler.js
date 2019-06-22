const cart = require('./cart');
const fs = require('fs');
const stats = require('./stats');

const actions = {
    add: cart.add,
    change: cart.change,
    delete: cart.del,
};

let handler = (req, res, action, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}))
        } else {
            let newCart = actions[action](JSON.parse(data), req);
            fs.writeFile(file, JSON.stringify(newCart.cart, null, 4), (err) => {
                if (err) {
                    res.sendStatus(404, JSON.stringify({result: 0, text: err}));
                } else {
                    res.send(JSON.stringify({result: 1, text: 'SUCCESS!'}));
                    stats(newCart.action, newCart.prod_name);
                }
            })
        }
    })
};

module.exports = handler;