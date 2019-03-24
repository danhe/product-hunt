<template>
  <div class="base-spinner">
    <VueSimpleSpinner />
  </div>
</template>

<script>
  import VueSimpleSpinner from 'vue-simple-spinner'

  export default {
    name: 'BaseSpinner',
    components: {
      VueSimpleSpinner
    }
  }
</script>