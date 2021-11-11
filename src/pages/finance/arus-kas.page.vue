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
        getSingleEntity: getArusKas,
        transformed: arusKas,
        errorMessage
      } = useFinanceReport({
        name: 'Neraca'
      })

      onMounted(getArusKas)

      return {
        result,
        arusKas,
        errorMessage
      }
    }
  })
</script>

<template>
  <LoadingPane v-if="result.type == 'loading'"/>
  <q-markup-table v-else-if="arusKas" separator="horizontal" flat square style="font-family: monospace !important;">
    <tbody>
      <tr>
        <th class="text-left" colspan="2">
          <div style="font-weight: bold; font-size: 1rem;">Aktivitas Operasional</div>
        </th>
      </tr>
      <tr>
        <td class="text-left">
          Penjualan
        </td>
        <td class="text-left">
          {{ arusKas.totalPenjualan }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Retur Pembelian Barang Dagang
        </td>
        <td class="text-left">
          {{ arusKas.totalRetur }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Pembelian Barang Dagang
        </td>
        <td class="text-left">
          {{ arusKas.pembelianBarangDagang }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Total Biaya Pengeluaran
        </td>
        <td class="text-left">
          {{ arusKas.totalBiayaPengeluaran }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Pembayaran Pajak Usaha
        </td>
        <td class="text-left">
          {{ arusKas.pajak }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Arus Kas Untuk Aktivitas Operasional
        </td>
        <td class="text-left">
          {{ arusKas.arusKasOperasional }}
        </td>
      </tr>
      <tr>
        <th class="text-left" colspan="2">
          <div style="height: 10px;"></div>
        </th>
      </tr>
      <tr>
        <th class="text-left" colspan="2">
          <div style="font-weight: bold; font-size: 1rem;">Aktivitas Investasi</div>
        </th>
      </tr>
      <tr>
        <td class="text-left">
          Investasi
        </td>
        <td class="text-left">
          {{ arusKas.investasi }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Peralatan Kantor
        </td>
        <td class="text-left">
          {{ arusKas.peralatan }}
        </td>
      </tr>
      <tr>
        <td class="text-left">
          Arus Kas untuk Aktivitas Investasi 
        </td>
        <td class="text-left">
          {{ arusKas.arusKasInvestasi }}
        </td>
      </tr>
    </tbody>
  </q-markup-table>
  <error-message v-else :message="errorMessage" />
</template>