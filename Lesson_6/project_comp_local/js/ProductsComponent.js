let ProductsComp = {
    data(){
      return {
          catalogUrl: `/catalogData.json`,
          products: [],
          filtered: [],
          imgCatalog: `https://placehold.it/200x150`,
      }
    },
    components: {
        'product': ProdItemComp,
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        this.$parent.getJson(`getProducts.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            })
    },
    template: `<div class="products">
        <product
        v-for="product of filtered" 
        :key="product.id_product"
        :product="product"
        :img="imgCatalog"></product>
    </div>`
};
