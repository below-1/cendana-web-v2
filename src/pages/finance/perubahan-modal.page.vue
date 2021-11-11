<script lang="ts">
  import { 
    defineComponent,
    onMounted
  } from 'vue'
  import LoadingPane from 'components/loading-pane.vue'
  import ErrorMessage from './error-message.vue'
  import useFinanceReport from './useFinanceReport'

  export default defineComponent({
    components: {
      LoadingPane,
      ErrorMessage
    },
    setup() {
      const {
        result,
        getSingleEntity: getPerubahanModal,
        transformed: perubahanModal,
        errorMessage
      } = useFinanceReport({
        name: 'Perubahan Modal'
      })

      onMounted(getPerubahanModal)

      return {
        result,
        perubahanModal,
        errorMessage
      }
    }
  })
</script>

<template>
  <LoadingPane 
    v-if="result.type == 'loading'"/>
  <q-markup-table 
    v-else-if="perubahanModal" 
    separator="horizontal" 
    flat 
    square 
    style="font-family: monospace !important;"
  >
    <tbody>
      <tr>
        <td class="text-left">
          Modal Awal
        </td>
        <td class="text-left">
          {{ perubahanModal.modalAwal }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Keperluan Pribadi
        </td>
        <td class="text-left">
          {{ perubahanModal.prive }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Laba Bersih
        </td>
        <td class="text-left">
          {{ perubahanModal.labaBersih }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Modal Akhir
        </td>
        <td class="text-left">
          {{ perubahanModal.modalAkhir }}
        </td>
      </tr>
    </tbody>
  </q-markup-table>
  <error-message v-else :message="errorMessage" />
</template>