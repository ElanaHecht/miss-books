export default {
   props: ['book'],
   template: `
               <section class="book-preview ">
                  <div class="book-info">
                     <div class="on-sale" v-if="isSale">SALE!</div>
                     <img :src="book.img">
                     <h3 class="book-title">{{book.title}}</h3>
                     <p class="book-price">{{formatPrice}}</p>
                  </div>
               </section>
   `,
   data(){
      return {
         isSale: this.book.isOnSale,
      }
   },
   computed: {
      formatPrice(){
        return this.book.price.toLocaleString('en-US', {style: 'currency', currency: this.book.currency}) 
      }
   }
}