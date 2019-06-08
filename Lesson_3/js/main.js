const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

/*
let getRequest = (url, cb) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status !== 200){
                console.log('error');
            } else {
                cb(xhr.responseText);
            }
        }
    }
};

// Первый вариант промисов:

let getRequest1 = new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status !== 200){
                reject(console.log('error'));
            } else {
                resolve(xhr.responseText);
            }
        }
    }
})

// Второй вариант промисов (фетч):

fetch(url, {method: 'GET'})
    .then((result) => {
        return result.text();
    })
    .catch((error) => console.log('error'))
*/



class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.data = [];
        this.allProducts = [];
        this._getProducts()
            .then(() => this._render());

    }
    _getProducts(){
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                this.data = [...data];
            })
            .catch(error => console.log('error'));
    }

    _render(){
        const block = document.querySelector(this.container);
        for (let item of this.data){
            const product = new ProductItem(item);
            this.allProducts.push(product);
            block.insertAdjacentHTML('beforeend', product.render());
        }
    }
}

class ProductItem {
    constructor(product, img = `https://placehold.it/200x150`){
        this.id_product = product.id_product;
        this.product_name = product.product_name;
        this.price = product.price;
        this.img = img;
    }
    render(){
        return `<div class="product-item">
                 <img src="${this.img}" alt="${this.product_name}">
                 <div class="desc">
                     <h3>${this.product_name}</h3>
                     <p>${this.price}</p>
                     <button class="buy-btn" data-id="${this.id_product}">Купить</button>
                 </div>
             </div>`
    }
}

class Cart{
    constructor(container = '.cart-container'){
        this.container = container;
        this.amount = 0;
        this.countGoods = 0;
        this.data = [];
        this.cartProducts = [];
        this._getCartList()
            .then(this._render())

        this.productsContainer = document.querySelector('.products');
        this.productsContainer.addEventListener('click', function(event){
            if(event.target.classList.contains('buy-btn')) {
                event.preventDefault();
                const product = products.allProducts;
                for(let item of product) {
                    if (event.target.dataset.id == item.id_product) {

                        cart._addItem(item);
                    }
                }
            }
        });

        this.cartContainer = document.querySelector(this.container)
        this.cartContainer.addEventListener('click', function(event){
            if(event.target.classList.contains('delete-btn')) {
                event.preventDefault();
                cart._deleteItem(event.target.dataset.id);
            }
        });
    }

    _addItem(item){
        let key = true;
        for (let product of this.data) {
            if (product.id_product == item.id_product) {
                key = false;
                product.quantity += 1;
                this._render();
            }
        }
        if (key) {
            item.quantity = 1;
            this.data = [...item];
            this._render();
        }
    }

    _deleteItem(id) {
        for(let item of this.data) {
            if (id == item.id_product) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    this._render();
                } else {
                    item = '';
                    this._render();
                }
            }
        }
    }

    _getCartList(){
        this.data = [
            {id_product: 123, product_name: "Ноутбук",price: 45600,quantity: 1},
            {id_product: 456, product_name: "Мышка",price: 1000,quantity: 1},
        ]
        this.amount = 46600;
        this.countGoods = 2;

        //Присвоения выше сделаны потому, что фетч ниже почему то не работает. Почему - я за 2 часа не разобрался...
        //upd. Фетч начал срабатывать после нажатия кнопки "Купить"... Я в шоке, но времени разобраться уже не осталось...

        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .then(data => {
                this.amount = data.amount;
                this.countGoods = data.countGoods;
                this.data = [...data.contents];
            })
            .catch(error => console.log('error'));
    }

    _render(){
        const block = document.querySelector(this.container);
        block.innerHTML = '';
        for (let item of this.data){
            const cartItem = new CartItem(item);
            this.cartProducts.push(cartItem);
            block.insertAdjacentHTML('beforeend', cartItem.render());
        };
        this._totalCost();

    }
    _totalCost() {
        const block = document.querySelector(this.container);
        if (this.amount) {
            block.insertAdjacentHTML('beforeend', `<p class="cart-total">Итого в корзине ${this.countGoods} товаров $${this.amount}</p>`);
        }
    }




}

class CartItem {
    constructor(product, img = `https://placehold.it/66x50`){
        this.id_product = product.id_product;
        this.product_name = product.product_name;
        this.price = product.price;
        this.img = img;
        this.quantity = product.quantity;
    }


    render(){
        return `<div class='cart-item'>
                 <img src='${this.img}' alt='${this.product_name}'>
                 <div class='desc-cart'>
                     <h3>${this.product_name}</h3>
                     <p>$${this.price}, ${this.quantity} шт.</p>
                 </div>
                 <button class='delete-btn' data-id='${this.id_product}'>Удалить</button>
             </div>`
    }
}

const products = new ProductsList();
const cart = new Cart();
