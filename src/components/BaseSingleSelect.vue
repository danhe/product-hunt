<template>
  <select
    class="base-single-select"
    :value="value"
    @change="onChange"
  >
    <option 
      class="base-single-select__option"
      v-for="(option, index) in options"
      :key="index"
      :value="_get(option, 'value')"
    >
      {{ _get(option, 'display') }}
    </option>
  </select>
</template>

<script>
  import _get from 'lodash/get'

  export default {
    props: {
      /**
       * Options for select
       */
      options: {
        type: Array,
        default: () => []
      },
      /**
       * Value of select
       */
      value: {
        type: Number,
        default: 0
      }
    },
    methods: {
      _get,
      /**
       * Emit the change event to parent
       * @param {Object} Object of change event
       */
      onChange(event){
        this.$emit('change', Number(event.target.value))
      }
    }
  }
</script>

