const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

class List {
    constructor(url, container) {
        this.container = container;
        this.url = url;
        this.data = [];
        this.allProducts = [];
        this._init();
    }
    getData (url) {
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => console.log(error))
    }
    handleData (data) {
        this.data = [...data];
        this.render();
    }
    getProduct(id){
        return this.allProducts.find(element => element.id_product === id);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let item of this.data) {
            const product = new lists[this.constructor.name](item);
            this.allProducts.push(product);
            block.insertAdjacentHTML('beforeend', product.render());
        }
    }
    _totalCost() { //TODO
        const block = document.querySelector(this.container);
        let price = 0;
        let quantity = 0;
        for (let item of this.data) {
            quantity += item.quantity;
            price += item.price*item.quantity;
        }
        if (price) {
            block.insertAdjacentHTML('beforeend', `<p class="cart-total">Итого в корзине ${quantity} товаров $${price}</p>`);
        }
    }
    _init() {
        return false;
    }
}

class Item {
    constructor(element, img = `https://placehold.it/200x150`){
        this.id_product = element.id_product;
        this.product_name = element.product_name;
        this.price = element.price;
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

class ProductsList extends List {
    constructor(cart, url = '/catalogData.json', container = '.products'){
        super (url, container);
        this.cart = cart;
        this.getData()
            .then(data => this.handleData(data));
    }
    _init() {
        document.querySelector(this.container).addEventListener('click', event => {
            if(event.target.classList.contains('buy-btn')) {
                let id = +event.target.dataset.id;
                cart.addProduct(this.getProduct(id));
            }
        })
    }
}

class ProductItem extends Item {}

class Cart extends List{
    constructor(url = '/getBasket.json', container = '.cart-container'){
        super(url, container);
        this.amount = 0;
        this.countGoods = 0;
        this.getData()
            .then(data => {
                this.amount = data.amount;
                this.countGoods = data.countGoods;
                return this.handleData(data.contents);
            })

    }

    handleData(data) {
        super.handleData(data);
    }

    render() {
        super.render();
        this._totalCost();
    }

    addProduct(product){
        this.getData(`${API}/addToBasket.json`)
            .then(data => {
                if (data.result) {
                    let find = this.allProducts.find(element => element.id_product === product.id_product);

                    if (find) {
                        this.amount += find.price;
                        this.countGoods += 1;
                        find.quantity++;
                        this._updCart(find);
                    } else {
                        let prod = Object.assign({quantity: 1}, product);
                        this.data = [prod];
                        this.amount += prod.price;
                        this.countGoods += 1;
                        this.render();
                    }
                } else {
                    console.log('Error');
                }
            })
    }

    deleteProduct(element) {
        this.getData(`${API}/deleteFromBasket.json`)
            .then(data => {
                if (data.result) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(elem => elem.id_product === productId);
                    this.amount -= find.price;
                    this.countGoods -= 1;
                    if (find.quantity > 1) {
                        find.quantity--;
                        this._updCart(find);
                    } else {
                        this.allProducts.splice(this.allProducts.indexOf(find), 1);
                        document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
                        this._totalCost();
                    }
                } else {
                    console.log('Error');
                }
            })
    }

    _updCart(product) {
        let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
        block.querySelector('.prod-quant').textContent = `${product.quantity}`;
        this._totalCost();
    }

    _totalCost() {
        const block = document.querySelector(this.container);
        if (block.querySelector('.cart-total')) {
            block.querySelector('.cart-total').remove();
        }
        if (this.amount) {
            block.insertAdjacentHTML('beforeend', `<p class="cart-total">Итого в корзине ${this.countGoods} товаров $${this.amount}</p>`);
        } else {
            block.innerHTML = `<p class="cart-total"> Cart is empty </p>`;
        }
    }
    _init() {
        document.querySelector(this.container).addEventListener('click', (event) => {
            if(event.target.classList.contains('delete-btn')) {
                event.preventDefault();
                this.deleteProduct(event.target);
            }
        });
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        })
    }
}

class CartItem extends Item {
    constructor(element, img = `https://placehold.it/66x50`){
        super(element, img);
        this.quantity = element.quantity;
    }

    render(){
        return `<div class='cart-item' data-id="${this.id_product}">
                 <img src='${this.img}' alt='${this.product_name}'>
                 <div class='desc-cart'>
                     <h3>${this.product_name}</h3>
                     <p><span class="prod-price">$${this.price}</span>, <span class="prod-quant">${this.quantity}</span> шт.</p>
                 </div>
                 <button class='delete-btn' data-id='${this.id_product}'>Удалить</button>
             </div>`
    }
}

const lists = {
    ProductsList: ProductItem,
    Cart: CartItem,
}

const cart = new Cart();
const products = new ProductsList(cart);

