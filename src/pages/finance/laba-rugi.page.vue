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
  import { useSingleEntityV2 } from 'src/compose/entity'
  import { Params } from './types'
  import fieldsToRupiah from './fieldsToRupiah'

  export default defineComponent({
    components: {
      LoadingPane
    },
    setup() {
      const params = inject<Params>('params')
      const axiosOptions = computed(() => ({
        params
      }))

      const {
        result,
        getSingleEntity: getLabaRugi
      } = useSingleEntityV2({
        entityName: 'Laporan Laba Rugi',
        url: '/v1/api/finance/report',
        axiosOptions
      })

      const labaRugi = computed(() => {
        const resValue = unref(result)
        if (!resValue || resValue.type !== 'result') {
          return null
        }
        const transformed = fieldsToRupiah(resValue.data)
        return transformed
      })

      const errorMessage = computed(() => {
        const resValue = unref(result)
        if (resValue.type !== 'error') {
          return null
        }
        const axiosError = (result.value as any).error
        const errorData = axiosError.response.data
        const code = errorData.code
        const message = errorData.message
        return message
      })

      watch(errorMessage, (x) => {
        console.log(x)
      })

      onMounted(getLabaRugi)
      watch(params!, getLabaRugi)

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