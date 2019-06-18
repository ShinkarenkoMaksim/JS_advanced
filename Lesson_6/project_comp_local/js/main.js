const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

const app = new Vue({
    el: '#app',
    data: {
        error: null,
    },
    components: {
        'error': ErrorComp,
        'cart': CartComp,
        'products': ProductsComp,
        'search': SearchComp,
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => this.error = error)
        },
    }
});
