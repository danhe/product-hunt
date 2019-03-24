<template>
  <Select
    class="base-single-select"
    :value="value"
    @change="onChange"
  >
    <Option 
      v-for="(option, index) in options"
      :key="index"
      :value="_get(option, 'value')"
      class="base-single-select__option"
    >
      {{ _get(option, 'display') }}
    </Option>
  </Select>
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

