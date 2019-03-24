<template>
  <table 
    class="post-infos"
    cellpadding="5"
  >
    <tr>
      <td 
        class="post-infos__td"
        v-for="(info, index) in postInfos"
        :key="index"
      >
        <div class="post-infos__td__number">
          {{ _get(info, 'number') }}
        </div>
        <div class="post-infos__td__title">
          {{ _get(info, 'title') }}
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
  import _get from 'lodash/get'

  export default {
    props: {
      /**
       * All information of post
       */
      postInfos: {
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
  @import '~@/assets/stylus/colors.styl'

  .post-infos {
    margin-left: auto
    margin-right: auto
    font-size: 14px

    &__td {

      &__number {
        font-size: 1.2em
        font-weight: bold
        color: $primary_color
      }

      &__title {
        font-size: 10px
        text-transform: uppercase
      }
    }
  }
</style>


