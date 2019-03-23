<template>
  <a 
    class="post-card"
    :href="_get(post, 'redirect_url')"
    target="_blank"
  >
    <div class="post-card__image">
      <img
        :alt="_get(post, 'name')" 
        :src="_get(post, 'screenshot_url.300px')"
      />
    </div>
    
    <div class="post-card__title" >
      {{ _get(post, 'name') }}
    </div>

    <div class="post-card__votes">
      {{ _get(post, 'votes_count') }} upvotes
    </div>

    <div class="post-card__tagline">
      {{ _get(post, 'tagline') }}
    </div>
  </a>
</template>

<script>
import _get from 'lodash/get'

export default {
  name: 'PostCard',
  props: {
    post: {
      type: Object,
      default: () => null
    }
  },
  methods: {
    _get
  }
}
</script>

<style lang="stylus" scoped>
  .post-card {
    background: white
    height: 230px
    text-decoration: none 
    display: block
    color: gray

    &__image  {
      height: 45%
      overflow-y: hidden

      & > img {
        max-width: 100%
      }
    }

    &__title {
      padding-top: 12px
      color: #de5327
      font-weight: bold
    }

    &__votes {
      font-size: 12px
      padding-top: 4px
    }

    &__tagline {
      color: black
      font-weight: 500
      margin: 15px
      overflow: hidden
      text-overflow: ellipsis
      display: -webkit-box
      font-size: 13px
      line-height: 16px
      max-height: 32px
      -webkit-line-clamp: 2
      -webkit-box-orient: vertical
    }
  }
</style>


