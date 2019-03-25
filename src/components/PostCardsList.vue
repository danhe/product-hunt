<template>
  <div class="post-cards-list">
    <PostCard 
      v-for="(post, index) in posts" 
      :key="index"
      :post="post"
    />
  </div>
</template>

<script>
import _get from 'lodash/get'

import PostCard from '@/components/PostCard.vue'

export default {
  name: 'PostCardsList',
  components: {
    PostCard
  },
  props: {
    /**
     * List of posts objects
     */
    posts: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    _get
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/stylus/layout.styl'

  .post-cards-list {
    grid-template-columns: repeat(3, 1fr)
    display: grid
    grid-column-gap: 24px
    grid-row-gap: 24px
    width: 100%

    @media phone {
      grid-template-columns: 1fr
    }

    @media tablet {
      grid-template-columns: repeat(2, 1fr)
    }
  }
</style>
