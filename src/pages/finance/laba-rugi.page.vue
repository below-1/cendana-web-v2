<script lang="ts">
  import { 
    defineComponent
  } from 'vue'
  import LoadingPane from 'components/loading-pane.vue'

  export default defineComponent({
    components: {
      LoadingPane
    },
    setup() {
      return {}
    }
  })
</script>

<template>
  <LoadingPane/>
</template>