
import { bookService } from '../services/book-service.js';
import { eventBus } from '../services/eventBus-service.js';
import bookFilter from '../cmps/book-filter.cmp.js'
import bookList from '../cmps/book-list.cmp.js'

export default {
   template: `
      <section class="book-app main-layout main-container">
         <book-filter @filtered="setFilter" v-if="!selectedBook"/>
         <book-list :books="booksToShow" @remove="removeBook" @selected="selectBook" v-if="!selectedBook" />
      </section>
   `,
   components: {
      bookFilter,
      bookList,
      // bookDetails,
   },
   data() {
      return {
         books: null,
         selectedBook: null,
         filterBy: null,
      };
   },
   created(){
      bookService.query()
      .then(books => this.books = books);
   },
   methods: {
      setFilter(filterBy) {
         this.filterBy = filterBy;
      },
      removeBook(id) {
            bookService.remove(id)
                .then(() => {
                    const idx = this.books.findIndex((book) => book.id === id);
                    this.books.splice(idx, 1);
                    eventBus.emit('show-msg', { txt: 'Removed successfully', type: 'success' });
                })
                .catch(err => {
                    console.error(err);
                    eventBus.emit('show-msg', { txt: 'Error - please try again later', type: 'error' });
                });
        },
      selectBook(id) {
         const book = this.books.find((book => book.id === id))
         this.$router.push('/book/'+ id);
      },

   },
   computed: {
      booksToShow() {
         if (!this.filterBy) return this.books;
         const regex = new RegExp(this.filterBy.title, 'i');
         const min = this.filterBy.fromPrice || 0;
         const max = this.filterBy.toPrice || Infinity;
         return this.books.filter(book => (regex.test(book.title) && (min < book.price) && (max > book.price)));
      },
   }
}
