<script lang="ts">
  import { 
    defineComponent,
    inject,
    unref,
    computed,
    onMounted,
    watch
  } from 'vue'
  import LoadingPane from 'components/loading-pane.vue'
  import useFinanceReport from './useFinanceReport'

  export default defineComponent({
    components: {
      LoadingPane
    },
    setup() {
      const {
        result,
        getSingleEntity: getLabaRugi,
        transformed: labaRugi,
        errorMessage
      } = useFinanceReport({
        name: 'Laba Rugi'
      })

      onMounted(getLabaRugi)

      return {
        result,
        labaRugi,
        errorMessage
      }
    }
  })
</script>

<template>
  <LoadingPane v-if="result.type == 'loading'"/>
  <q-markup-table v-else-if="labaRugi" separator="horizontal" flat square style="font-family: monospace !important;">
    <tbody>
      <tr>
        <td class="text-left">
          Penjualan
        </td>
        <td class="text-left">
          {{ labaRugi.totalPenjualan }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Harga Pokok Penjualan
        </td>
        <td class="text-left">
          {{ labaRugi.hpp }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Laba Kotor
        </td>
        <td class="text-left">
          {{ labaRugi.labaKotor }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Jumlah Beban Usaha
        </td>
        <td class="text-left">
          {{ labaRugi.labaKotor }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Laba Sebelum Pajak
        </td>
        <td class="text-left">
          {{ labaRugi.labaSebelumPajak }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Pajak
        </td>
        <td class="text-left">
          {{ labaRugi.pajak }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Laba Bersih
        </td>
        <td class="text-left">
          {{ labaRugi.labaBersih }}
        </td>
      </tr>
    </tbody>
  </q-markup-table>
  <div v-else class="bg-grey-2 row items-center justify-center" style="height: 300px;">
    <h5>{{ errorMessage }}</h5>
  </div>
</template>