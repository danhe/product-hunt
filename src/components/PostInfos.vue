<template>
  <div class="post-infos">
    <div class="post-infos-count">
      <div class="post-infos-count__number">
        {{ postsCount }}
      </div>
      <div class="post-infos-count__text">
        Posts
      </div>
    </div>

    <div class="post-infos-count">
      <div class="post-infos-count__number">
        {{ votesCount }}
      </div>
      <div class="post-infos-count__text">
        Votes
      </div>
    </div>

    <div class="post-infos-count">
      <div class="post-infos-count__number">
        {{ commentsCount }}
      </div>
      <div class="post-infos-count__text">
        Comments
      </div>
    </div>

    <div class="post-infos-count">
      <div class="post-infos-count__number">
        {{ makersCount }}
      </div>
      <div class="post-infos-count__text">
        Makers
      </div>
    </div>
  </div>
</template>

<script>
  import _get from 'lodash/get'

  export default {
    props: {
      /**
       * Amount of post
       */
      postsCount: {
        type: Number,
        default: 0
      },
      /**
       * Amount of votes
       */
      votesCount: {
        type: Number,
        default: 0
      },
      /**
       * Amount of comments
       */
      commentsCount: {
        type: Number,
        default: 0
      },
      /**
       * Amount of makers
       */
      makersCount: {
        type: Number,
        default: 0
      }
    },
    methods: {
      _get
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~@/assets/stylus/colors.styl'

  .post-infos {
    font-size: 14px
    display: flex

    &-count {
      margin: 0 5px 0 5px

      &:first-child {
        margin-left: auto
      }

      &:last-child {
        margin-right: auto
      }

      &__number {
        font-size: 1.2em
        font-weight: bold
        color: $primary_color
      }

      &__text {
        font-size: 10px
        text-transform: uppercase
      }
    }
  }
</style>


