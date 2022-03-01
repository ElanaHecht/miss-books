export default {
   template: `
       <section class="book-filter main-layout">
           <div class="filters flex">
                    <label>
                        Search Title
                    <input @input="setFilter" type="search" v-model="filterBy.title" ref="titleInput">
                    </label>

                    <label class="filter-price flex align-items">
                        Price
                        <h5>{{filterBy.fromPrice}}</h5>
                        <input @input="setFilter" type="range" v-model="filterBy.fromPrice" min="0" max="200">
                        <input @input="setFilter" type="range" v-model="filterBy.toPrice" min="0" max="200">
                        <h5>{{filterBy.toPrice}}</h5>
                    </label>
           </div>
       </section>
   `,
   data() {
       return {
           filterBy: {
               title: '',
               fromPrice: 0,
               toPrice: 200,
           }
       };
   },
   mounted(){
    this.$refs.titleInput.focus()
   }, 
   methods: {
       setFilter() {
           this.$emit('filtered', {...this.filterBy});
       }
   }
}