import { utilService } from "../services/util-service.js";
import { storageService } from './async-storage-service.js';

const BOOKS_KEY = 'books';
_createBooks();

export const bookService = {
   query,
   remove,
   save,
   get,
   addReview,
   removeReview,
   getEmptyReview
};

function query() {
   return storageService.query(BOOKS_KEY);
}

function addReview(bookId, review) {
   return get(bookId)
      .then(book => {
         review.id = utilService.makeId();
         book.reviews.push(review);
         console.log(book.reviews);
         return storageService.put(BOOKS_KEY, book);
         //return book
      })
}

function removeReview(book, reviewId) {
   const idx = book.reviews.findIndex(review => review.id === reviewId)
   book.reviews.splice(idx, 1)
   return storageService.put(BOOKS_KEY, book)
}

function remove(bookId) {
   return storageService.remove(BOOKS_KEY, bookId);
}

function get(bookId) {
   return storageService.get(BOOKS_KEY, bookId);
}

function save(book) {
   if (book.id) return storageService.put(BOOKS_KEY, book);
   else return storageService.post(BOOKS_KEY, book);
}

function getEmptyReview() {
   return {
      name: 'Books Reader',
      rate: 1,
      ReadAt: new Date().toISOString().slice(0, 10),
      txt: '',
   };
}

function _createBooks() {
   const books = utilService.getBooks().map(book => {
      return {
         id: book.id,
         title: book.title,
         subtitle: book.subtitle,
         authors: book.authors,
         published: book.publishedDate,
         img: book.thumbnail,
         description: book.description,
         pages: book.pageCount,
         categories: book.categories,
         language: book.language,
         price: book.listPrice.amount,
         currency: book.listPrice.currencyCode,
         isOnSale: book.listPrice.isOnSale,
         reviews: [],
      }
   })
   utilService.saveToStorage(BOOKS_KEY, books)
   return books
}