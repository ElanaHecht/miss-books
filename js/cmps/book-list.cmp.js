import bookPreview from './book-preview.cmp.js';

export default {
   props: ['books'],
   template: `
   <section class="book-list">
      <ul>
         <li v-for="book in books" :key="book.id" class="book-preview-container" @click="select(book.id)">
            <book-preview :book="book"/>
            <button class="remove btn" @click="remove(book.id)">Remove</button>
         </li>
      </ul>
   </section>
   `,
   components: {
      bookPreview,
   },
   methods: {
      remove(id) {
         this.$emit('remove', id)
      },
      select(id) {
         this.$emit('selected', id)
      }
   }
}