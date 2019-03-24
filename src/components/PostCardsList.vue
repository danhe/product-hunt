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
  .post-cards-list {
    display: grid
    grid-template-columns: repeat(3, 1fr)
    grid-column-gap: 24px
    grid-row-gap: 24px
    width: 100%
  }
</style>
