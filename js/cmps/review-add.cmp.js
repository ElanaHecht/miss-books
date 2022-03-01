import { bookService } from '../services/book-service.js';
import { eventBus } from '../services/eventBus-service.js';

export default {
   props: ['bookId'],
   template: `
       <section class="review-add flex">
          <div class="form-container">
          <h1>Book Review</h1>
           <form @submit.prevent="add" class="flex column">
            <label>Name:
               <input type="text" v-model="review.name" ref="reviewInput" />
               </label>
               <label>Rate (1-5)
               <select v-model.number="review.rate">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
               </select>
               </label>
               <label>Date book was read:
                  <input type="date" v-model="review.readAt" />
               </label>
               <label>Comments
                  <input type="text" v-model="review.txt" placeholder="Type comments here" />
               </label>
               <button>Add</button>
            </form>
            </div>
            <div v-if="book" class="review-list flex wrap">
               <h1>Reviews</h1>
               <ul class="review flex">
                  <li v-for="review in book.reviews">
                     <p>Rating: <span>{{review.rate}}</span></p>
                     <p>Reviewed by: <span>{{review.name}}</span></p>
                     <p>Date of review: <span>{{review.readAt}}</span></p>
                     <p>Comments: <span>{{review.txt}}</span></p>
                     <button class="remove btn" @click="remove(review.id)">X</button>
                  </li>
               </ul>
            </div>       
         </section>
   `,
   data() {
      return {
         book: null,
         review: {
            name: 'Books Reader',
            rate: 1,
            readAt: new Date().toISOString().slice(0, 10),
            txt: '',
         },
      }
   },
   created() {
      bookService.get(this.bookId).then(book => this.book = book)
   },
   mounted() {
      this.$refs.reviewInput.focus()
   },
   methods: {
      add() {
         console.log(this.review);
         bookService.addReview(this.bookId, { ...this.review })
            .then(book => {
               console.log(this.book);

               this.book = book;
               this.review = bookService.getEmptyReview()
               eventBus.emit('show-msg', { txt: 'Review added', type: 'success' })
            })
      },
      removeReview(id) {
         bookService.removeReview(this.book, id)
            .then(book => {
               this.book = book;
               eventBus.emit('show-msg', { txt: 'Removed review', type: 'success' });
            })
      },
   },
}
