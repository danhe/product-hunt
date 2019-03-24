<template>
  <div class="home">
    <div class="home__title">
      {{ productName }}
    </div>

    <div class="home__subtitle">
      {{ productDesc }}
    </div>
    
    <BaseSingleSelect 
      class="home__date-filter"
      :options="dateOptions"
      :value="dateFilter"
      @change="onDateChange"
    />

    <VueSimpleSpinner v-if="isLoading"/>

    <template v-else>
      <PostInfos 
        class="home__posts-infos"
        :postInfos="postInfos"
      />

      <PostCardsList
        class="home__posts-list"
        :posts="posts"
      />
    </template>
  </div>
</template>

<script>
  import _get from 'lodash/get'
  import _sumBy from 'lodash/sumBy'
  import _range from 'lodash/range'

  import axios from 'axios'
  import VueSimpleSpinner from 'vue-simple-spinner'
  import PostCardsList from '@/components/PostCardsList.vue'
  import PostInfos from '@/components/PostInfos.vue'
  import BaseSingleSelect from '@/components/BaseSingleSelect.vue'

  const PRODUCT_NAME = "ProductHunt"
  const PRODUCT_DESC = "The best new products, every day"

  export default {
    name: 'home',
    data(){
      return {
        /**
         * List of posts of date
         */
        posts: [],
        productName: PRODUCT_NAME,
        productDesc: PRODUCT_DESC,
        /**
         * Date filter
         */
        dateFilter: 0,
        /**
         * Loading indicator
         */
        isLoading: true,
      }
    },
    created(){
      this.fetchPosts()
    },
    components: {
      PostInfos,
      PostCardsList,
      BaseSingleSelect,
      VueSimpleSpinner
    },
    computed: {
      /**
       * All options to display in the select
       */
      dateOptions(){
        const { displayDate } = this

        return _range(31).map((index) => {
          return {
            value: index,
            display: displayDate(index)
          }
        })
      },
      /**
       * Post informations
       */
      postInfos() {
        const { posts } = this
        return [{
          number: posts.length,
          title: 'posts'
        }, {
          number: _sumBy(posts, 'votes_count'),
          title: 'votes'
        }, {
          number: _sumBy(posts, 'comments_count'),
          title: 'comments'
        }, {
          number: _sumBy(posts, (object) => {
            return _get(object, 'makers').length
          }),
          title: 'makes'
        }]
      }
    },
    methods: {
      /**
       * When changing the date of select
       *  update the dateFilter and get new updated posts
       * @param {Number} value: Value of select
       */
      onDateChange(value) {
        const { fetchPosts } = this

        this.dateFilter = value
        fetchPosts()
      },
      /**
       * Getting posts of date filter from server
       */
      fetchPosts(){
        this.isLoading = true
        const { dateFilter } = this

        const instance = axios.create({
          baseURL: 'https://api.producthunt.com',
          timeout: 10000,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 9fc09fc67a01d1ab20b258db5b1751f071e1aabd1c394c54850b85da0890bda5'
          }
        })

        instance.get('/v1/posts', {
          params: {
            days_ago: dateFilter
          }
        }).then(response => {
            this.posts = _get(response, 'data.posts')
            this.isLoading = false
        }).catch(error => {
          this.isLoading = false
          console.log(error)
        })
      },
      /**
       * @param {Number} daysAgo: datefilter qui present how many days ago
       * @returns {String} Date display
       */
      displayDate(daysAgo){
        switch(daysAgo){
          case 0: 
            return 'Today'
            break
          case 1:
            return 'Yesterday'
            break
          default:
            return `${daysAgo} days ago`
            break
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/stylus/colors.styl'

  .home {
    padding-bottom: 60px
    
    &__title {
      font-size: 1.6em
      font-weight: bold
      color: $primary_color
    }

    &__subtitle {
      font-size: 13px
    }

    &__date-filter {
      margin: 24px 0 24px 0
    }

    &__posts-infos {
      padding-bottom: 24px
    }
  }

</style>

