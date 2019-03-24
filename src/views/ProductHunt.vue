<template>
  <main class="product-hunt">
    <h1 class="product-hunt__title">
      {{ productName }}
    </h1>

    <div class="product-hunt__subtitle">
      {{ productDesc }}
    </div>
    
    <BaseSingleSelect 
      class="product-hunt__date-filter"
      :options="dateOptions"
      :value="daysAgo"
      @change="onDateChange"
    />

    <BaseSpinner v-if="isLoading" />

    <div 
      v-else-if="hasErrors"
      class="product-hunt--errors"
    >
      Something went wrong, please try later
    </div>

    <template v-else>
      <PostInfos 
        class="product-hunt__posts-infos"
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

  import BaseSingleSelect from '@/components/BaseSingleSelect.vue'
  import BaseSpinner from '@/components/BaseSpinner.vue'
  import PostCardsList from '@/components/PostCardsList.vue'
  import PostInfos from '@/components/PostInfos.vue'

  import ProductHuntMixin from '@/mixins/ProductHuntMixin.vue'

  import { formatDaysAgo } from '@/utils/format.js'

  const PRODUCT_NAME = "ProductHunt"
  const PRODUCT_DESC = "The best new products, every day"
  const MAX_DAYS_AGO = 31

  export default {
    name: 'ProductHunt',
    components: {
      BaseSingleSelect,
      BaseSpinner,
      PostCardsList,
      PostInfos,
    },
    mixins: [
      ProductHuntMixin,
    ],
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
        return _range(MAX_DAYS_AGO).map(value => ({ 
          value, 
          display: formatDaysAgo(value) 
        }))
      },
      /**
       * Post informations
       * @return {Object} of posts informations
       */
      postsCountInfos() {
        const { posts } = this

        return {
          postsCount: _get(posts, 'length', 0),
          votesCount: _sumBy(posts, 'votes_count'),
          commentsCount: _sumBy(posts, 'comments_count'),
          makersCount: _sumBy(posts, (object) => {
            return _get(object, 'makers').length
          })
        }
      }
    },
    async created(){
      const { getPosts, daysAgo } = this

      this.posts = await getPosts(daysAgo)
    },
    methods: {
      /**
       * When changing the date of select
       *  update the daysAgo and get new updated posts
       * @param {Number} value: Value of select
       */
      async onDateChange(value) {
        const { getPosts } = this

        this.daysAgo = value
        this.posts = await getPosts(this.daysAgo)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/stylus/colors.styl'

  .product-hunt {
    padding-bottom: 60px

    &--errors {
      color: #d8000c
      background-color: #ffd2d2
      margin: 10px 22px
      vertical-align: middle
      border-radius: .2em
      padding: 10px
    }
    
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

