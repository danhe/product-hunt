<script>
  import axios from 'axios'
  import _get from 'lodash/get'

  export default {
    data() {
      return {
        /**
         * Loading indicator
         */
        isLoading: false,
        /**
         * Error indicator
         */
        hasErrors: false,
        /**
         * Priavte variable:
         *  axios instance
         */
        $_productHuntMixin_instance: null,
      }
      
    },
    created() {
      // Create private instance of axios with specific configurations
      this.$_productHuntMixin_instance = axios.create({
        baseURL: 'https://api.producthunt.com',
        timeout: 10000,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.VUE_APP_TOKEN}`
        }
      })
    },
    methods: {
      /**
       * Sending request to server to get the post of selected day
       *  - if success, return the posts list
       *  - if error, toggle error indicator to true
       * @param {Number} daysAgo 
       * 
       */
      getPosts(daysAgo) {        
        const { 
          $_productHuntMixin_instance, 
          $_productHuntMixin_success, 
          $_productHuntMixin_error 
        } = this

        this.isLoading = true

        return $_productHuntMixin_instance.get('/v1/posts', {
          params: {
            days_ago: daysAgo
          }
        })
        .then($_productHuntMixin_success)
        .catch($_productHuntMixin_error)
      },
      /**
       * Private method
       * Return posts list when success
       * @param {Object} response of the query sent in getPosts
       */
      $_productHuntMixin_success(response) {
        this.isLoading = false
        
        return _get(response, 'data.posts')
      },
      /**
       * Private method
       * Toggle the error indicator when reponse of the query is failed
       */
      $_productHuntMixin_error() {
        this.isLoading = false
        this.hasErrors = true
      }
    }
  }
</script>
