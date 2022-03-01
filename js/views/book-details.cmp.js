import { bookService } from '../services/book-service.js';
import longText from '../cmps/long-text.cmp.js'
import reviewAdd from '../cmps/review-add.cmp.js'

export default {
   // props: ['book'],
   template: `
   <section v-if="book" class="book-details main-layout">
      <div class="book-container flex even">
      <div class="details-img">
         <img :src="book.img" />
      </div>
      <div class="book-facts">
         <h2>{{book.title}}</h2>
         <h1>{{book.subtitle}}</h1>
         <h3>{{formatAuthors}}</h3>
            <p v-if="!isLonger">{{formatDesc}}</p>
            <long-text :txt="book.description" v-if="isLonger" />
            <button @click="isLonger = !isLonger" class="more-text btn">{{modifiedBtn}}</button>
         <h2 :class="priceStyle">{{formatPrice}}</h2>
         <h4>Published: {{formatPublished}}</h4>
         <h4>Pages: {{formatPages}}</h4>
         <h4>Categories: {{formatCategories}}</h4>
         <button @click="closeDetails" class="back btn">← Back</button>
      </div>
      </div>
      <div class="review-container">
         <review-add :bookId="book.id"  />
      </div>

   </section>
   `,
   data() {
      return {
         book: null,
         isOpen: true,
         isLonger: false,
         review: null,
      }
   },
   components: {
      longText,
      reviewAdd,
   },
   mounted() {
      const id = this.$route.params.bookId;
      bookService.get(id)
         .then(book => this.book = book);
   },
   methods: {

      closeDetails() {
         this.$emit('close');
      },
   },
   computed: {
      formatAuthors() {
         return (this.book.authors.length < 2) ? this.book.authors[0] : this.book.categories.join('&');
      },
      formatCategories() {
         return (this.book.categories.length < 2) ? this.book.categories[0] : this.book.categories.join(',');
      },
      formatDesc() {
         return this.book.description.slice(0, 100)
      },
      formatPages() {
         const pages = this.book.pages;
         if (pages > 500) return `${pages} pages - **Long Reading**`;
         else if (200 < pages < 500) return `${pages} pages - **Decent Reading**`;
         else return `${pages} pages - **Light Reading**`;
      },
      formatPublished() {
         const bookYear = this.book.published;
         const currYear = new Date().getFullYear();
         const diff = currYear - bookYear;
         if (diff > 10) return `${bookYear} - **Veteran Book**`
         else return `${bookYear} - **NEW**`
      },
      formatPrice() {
         return this.book.price.toLocaleString('en-US', { style: 'currency', currency: this.book.currency })
      },
      priceStyle() {
         const price = this.book.price;
         return { high: price > 150, low: price < 20 }
      },
      modifiedBtn() {
         if (this.book.description.length > 100) {
            return this.isLonger ? 'Read Less' : 'Read More';
         }
      }
   }
}
