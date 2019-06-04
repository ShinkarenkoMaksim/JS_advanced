class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.data = [];
        this.allProducts = [];
        this.init();
        this.totalCost();
    }
    init(){
        this._fetchProducts();
        this._render();
    }
    _fetchProducts(){
        this.data = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 30},
            {id: 3, title: 'Keyboard', price: 55},
            {id: 4, title: 'Gamepad', price: 65},
        ];
    }
    _render(){
        const block = document.querySelector(this.container);
        for (let item of this.data){
            const product = new ProductItem(item);
            this.allProducts.push(product);
            block.insertAdjacentHTML('beforeend', product.render());
        }
    }
    totalCost(){
        let total = 0;
        for (let item of this.allProducts) {
            total += item.price;
        }
        console.log(total);
    }
}

class ProductItem {
    constructor(product, img = `https://placehold.it/200x150`){
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = img;
    }
    render(){
        return `<div class='product-item'>
                 <img src='${this.img}' alt='${this.title}'>
                 <div class='desc'>
                     <h3>${this.title}</h3>
                     <p>$${this.price}</p>
                     <button class='buy-btn' data-id='${this.id}'>Купить</button>
                 </div>
             </div>`
    }
}

//Возможно, стоило унаследовать классы ProductsList и ProductItem для корзины, но мне показалось, что это будет сложнее поддерживать. Для корзины думал о создании отдельного класса генерации "подвала" с кнопкой "Заказать" и подсчетом суммы стоимости товара, наверное, так и будем делать.

//Реализация методов и конструкторов корзины написана в качестве заглушек, понимаю, что их придётся полностью переделать.

class CartList {
    constructor(container = '.cart'){
        this.container = container;
        this.data = [];
        this.cartProducts = [];
        this.init();
    }
    init(){
        this._fetchProducts();
        this._render();
        this._totalCost();
    }
    _fetchProducts(){
        this.data = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 30},
        ];
    }
    _render(){
        const block = document.querySelector(this.container);
        for (let item of this.data){
            const product = new CartItem(item);
            this.cartProducts.push(product);
            block.insertAdjacentHTML('beforeend', product.render());
        }
        const cartOverall = new CartOverall();
        block.insertAdjacentHTML('beforeend', cartOverall.render());
    }
    _totalCost() {
        let total = 0;
        for (let item of this.data) {
            total += item.price;
        }
        const block = document.querySelector(this.container);
        block.insertAdjacentHTML('beforeend', total);
    }
}

class CartItem {
    constructor(product, img = `https://placehold.it/100x75`, quantity = 1){
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = img;
        this.quantity = quantity;
    }
    render(){
        return `<div class='cart-item'>
                 <img src='${this.img}' alt='${this.title}'>
                 <div class='desc-cart'>
                     <h3>${this.title}</h3>
                     <p>$${this.price}</p>
                 </div>
                 <input class='quantity' type='number' value = '${this.quantity}' min='1'>
                 <button class='delete-btn' data-id='${this.id}'>Удалить</button>
             </div>`
    }
    deleteItem(){
        return '';
    }
}

class CartOverall { //TODO
    constructor(product) {
        this.orderBtn = `<button class='order-btn''>Заказать</button>`;
        this.total = `Итого в корзине: $`;//TODO
        this.render();
        //TODO
    }
    
    render(){
        return `${this.orderBtn} ${this.total} `;
    }
}

const products = new ProductsList();

const cart = new CartList();



// const products = [
//     {id: 1, title: 'Notebook', price: 2000},
//     {id: 2, title: 'Mouse', price: 30},
//     {id: 3, title: 'Keyboard', price: 55},
//     {id: 4, title: 'Gamepad', price: 65},
// ];
//
// const renderProduct = (title, price, img = `https://placehold.it/200x150`) => {
//     return `<div class="product-item">
//                  <img src="${img}" alt="${title}">
//                  <div class="desc">
//                      <h3>${title}</h3>
//                      <p>${price}</p>
//                      <button class="buy-btn">Купить</button>
//                  </div>
//              </div>`
// };
//
// const renderPage = list => {
//     // document.querySelector('.products').innerHTML = list.map(item => renderProduct(item.title, item.price)).join('');
//     for (let product of list){
//         document.querySelector('.products').insertAdjacentHTML('beforeend', renderProduct(product.title, product.price));
//     }
// };
//
// renderPage(products);