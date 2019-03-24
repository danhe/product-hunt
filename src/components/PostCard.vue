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

    <div class="post-card__text" >
      <div class="post-card__text__title" >
        {{ _get(post, 'name') }}
      </div>

      <div class="post-card__text__votes">
        {{ _get(post, 'votes_count') }} upvotes
      </div>

      <div class="post-card__text__tagline">
        {{ _get(post, 'tagline') }}
      </div>
    </div>
  </a>
</template>

<script>
import _get from 'lodash/get'

export default {
  name: 'PostCard',
  props: {
    /**
     * Post object to display
     */
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
  @import '~@/assets/stylus/colors.styl'

  ellipsisTextLines(maxLine, lineHeight)
    overflow: hidden
    text-overflow: ellipsis
    display: -webkit-box
    line-height: lineHeight
    max-height: lineHeight * maxLine
    -webkit-line-clamp: maxLine
    -webkit-box-orient: vertical

  .post-card {
    border: 1px solid #ece5e5
    background: white
    height: 230px
    text-decoration: none 
    display: block
    color: #6d6d6d
    font-weight: 500
    

    &__image  {
      height: 45%
      overflow-y: hidden

      & > img {
        max-width: 100%
      }
    }

    &__text {
      padding: 0 15px 0 15px

      &__title {
        padding-top: 12px
        font-weight: bold
        color: $primary_color
        ellipsisTextLines(1, 20px)
      }

      &__votes {
        font-size: 13px
        padding-top: 4px
      }

      &__tagline {
        color: black
        font-size: 13px
        ellipsisTextLines(2, 16px)
        margin-top: 15px
      }

    }
  }
</style>


