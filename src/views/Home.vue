<template>
  <main class="home">
    <h1 class="home__title">
      {{ productName }}
    </h1>

    <div class="home__subtitle">
      {{ productDesc }}
    </div>
    
    <BaseSingleSelect 
      class="home__date-filter"
      :options="dateOptions"
      :value="daysAgo"
      @change="onDateChange"
    />

    <BaseSpinner v-if="isLoading" />

    <template v-else>
      <PostInfos 
        class="home__posts-infos"
        v-bind="postsCountInfos"
      />

      <PostCardsList :posts="posts" />
    </template>
  </main>
</template>

<script>
  import _get from 'lodash/get'
  import _sumBy from 'lodash/sumBy'
  import _range from 'lodash/range'
  import axios from 'axios'

  import BaseSingleSelect from '@/components/BaseSingleSelect.vue'
  import BaseSpinner from '@/components/BaseSpinner.vue'
  import PostCardsList from '@/components/PostCardsList.vue'
  import PostInfos from '@/components/PostInfos.vue'

  const PRODUCT_NAME = "ProductHunt"
  const PRODUCT_DESC = "The best new products, every day"
  const MAX_DAYS_AGO = 31

  export default {
    name: 'Home',
    components: {
      BaseSingleSelect,
      BaseSpinner,
      PostCardsList,
      PostInfos,
    },
    data(){
      return {
        /**
         * List of posts for the selected day
         */
        posts: [],
        /**
         * Select daysAgo to display the posts of that day
         */
        daysAgo: 0,
        /**
         * Loading indicator
         */
        isLoading: false,
        /**
         * Constants: 
         */
        productName: PRODUCT_NAME,
        productDesc: PRODUCT_DESC,
      }
    },
    computed: {
      /**
       * All options to display in the select
       * @return {Array} of options
       */
      dateOptions(){
        const { displayDate } = this

        return _range(MAX_DAYS_AGO).map(value => ({ 
          value, 
          display: displayDate(value) 
        }))
      },
      /**
       * Post informations
       * @return {Object} of posts informations
       */
      postsCountInfos() {
        const { posts } = this

        return {
          postsCount: posts.length,
          votesCount: _sumBy(posts, 'votes_count'),
          commentsCount: _sumBy(posts, 'comments_count'),
          makersCount: _sumBy(posts, (object) => {
            return _get(object, 'makers').length
          })
        }
      }
    },
    created(){
      this.fetchPosts()
    },
    methods: {
      /**
       * When changing the date of select
       *  update the daysAgo and get new updated posts
       * @param {Number} value: Value of select
       */
      onDateChange(value) {
        const { fetchPosts } = this

        this.daysAgo = value
        fetchPosts()
      },
      /**
       * Getting posts of date filter from server
       */
      fetchPosts(){
        const { daysAgo } = this
        this.isLoading = true

        const instance = axios.create({
          baseURL: 'https://api.producthunt.com',
          timeout: 10000,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.VUE_APP_TOKEN}`
          }
        })

        instance.get('/v1/posts', {
          params: {
            days_ago: daysAgo
          }
        }).then(response => {
            this.posts = _get(response, 'data.posts')
            this.isLoading = false
        }).catch(() => {
          this.isLoading = false
        })
      },
      /**
       * @param {Number} daysAgo: daysAgo qui present how many days ago
       * @returns {String} Date display
       */
      displayDate(daysAgo){
        switch(daysAgo){
          case 0: 
            return 'Today'
          case 1:
            return 'Yesterday'
          default:
            return `${daysAgo} days ago`
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
      color: $primary_color
      font-size: 1.6em
      margin: 0
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

