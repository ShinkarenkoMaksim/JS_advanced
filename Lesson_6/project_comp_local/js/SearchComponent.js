let SearchComp = {
    data(){
      return {
          userSearch: '',
      }
    },
    //Значение userSearch пробрасывается через main в products. Мне кажется, это излишне связывает компоненты, но я пока недостаточно познакомился с vue, чтобы найти более оптимальное решение (хотя можно было пробросить значение через props, но мне показалось, что это не особо меняет картину)
    template: `<form action="#" method="post" class="search-form" @submit.prevent="$emit('filter', userSearch)">
                <input type="text" class="search-field" v-model="userSearch">
                <button class="btn-search" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </form>`
};