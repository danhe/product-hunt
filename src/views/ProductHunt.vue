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

    <div
      v-if="hasDaysAgoWarning"
      class="product-hunt--warnings"
    >
      You can just get the products of maxime 30 days ago
    </div>

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
  import { mapGetters } from 'vuex'
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
  const MAX_DAYS_AGO = 30

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
    props: {
      urlDaysAgo: {
        type: Number,
        default: 0
      }
    },
    data(){
      return {
        /**
         * Select daysAgo to display the posts of that day
         * If the url params is larger than MAX_DAYS_AGO, return the max days ago
         */
        daysAgo: (this.urlDaysAgo > MAX_DAYS_AGO ? MAX_DAYS_AGO : this.urlDaysAgo),
        /**
         * Loading indicator
         */
        isLoading: false,
        /**
         * Warning indicator
         */
        hasDaysAgoWarning: false,
        /**
         * Constants: 
         */
        productName: PRODUCT_NAME,
        productDesc: PRODUCT_DESC,
      }
    },
    computed: {
      /**
       * List of posts for the selected day
       */
      ...mapGetters({
        posts: 'selectPosts'
      }),
      /**
       * All options to display in the select
       * @return {Array} of options
       */
      dateOptions(){
        return _range(MAX_DAYS_AGO + 1).map(value => ({ 
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
      const { getPosts, daysAgo, urlDaysAgo } = this

      // When the url daysAgo is larger than max value, re-push the url params with correted one
      if(urlDaysAgo > daysAgo ) {
        this.hasDaysAgoWarning = true
        this.$router.push({
          name: 'product-hunt', 
          query: { 
            days_ago: daysAgo
          } 
        })
      }

      await getPosts(daysAgo)
    },
    methods: {
      /**
       * When changing the date of select
       *  update the daysAgo and get new updated posts
       * @param {Number} value: Value of select
       */
      async onDateChange(value) {
        const { getPosts } = this

        this.hasDaysAgoWarning = false
        this.daysAgo = value
        await getPosts(this.daysAgo)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/stylus/colors.styl'

  alertStyle(color, backgroundColor)
    color: color
    background-color: backgroundColor
    margin: 10px 0
    vertical-align: middle
    border-radius: .2em
    padding: 10px

  .product-hunt {
    padding-bottom: 60px

    &--errors {
      alertStyle(#d8000c, #ffd2d2)
    }

    &--warnings {
      alertStyle(#9F6000, #FEEFB3)
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

