<script lang="ts">
  import { 
    defineComponent,
    onMounted,
    PropType
  } from 'vue'

  export default defineComponent({
    props: {
      message: {
        type: String as PropType<string>
      }
    }
  })
</script>

<template>
  <div class="bg-grey-2 row items-center justify-center" style="height: 300px;">
    <h5>{{ message }}</h5>
  </div>
</template>
