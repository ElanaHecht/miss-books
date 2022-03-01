export default {
   props: ['txt'],
   template:`
   <section class="long-text">
      <p>{{moreText}}</p>
   </section>
   `,
   computed: {
      moreText(){
return this.txt
      }
   }
}