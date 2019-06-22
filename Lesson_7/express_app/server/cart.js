let add = (cart, req) => {
    cart.contents.push(req.body);
    cart.amount += req.body.price;
    cart.countGoods += 1;
    return {cart: cart, action: 'add', prod_name: req.body.product_name};
};
let change = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    if (req.body.quantity > 0) {
        cart.amount += find.price;
        cart.countGoods += 1;
        return {cart: cart, action: 'add', prod_name: req.body.product_name};
    } else {
        cart.amount -= find.price;
        cart.countGoods -= 1;
        return {cart: cart, action: 'remove', prod_name: req.body.product_name};
    }
};
let del = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    cart.contents.splice(cart.contents.indexOf(find), 1);
    cart.amount -= find.price;
    cart.countGoods -= find.quantity;
    return {cart: cart, action: 'remove', prod_name: req.body.product_name};
}
module.exports = {
    add,
    change,
    del
}