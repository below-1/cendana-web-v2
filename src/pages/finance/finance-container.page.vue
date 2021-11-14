<script lang="ts">
  import { 
    defineComponent, 
    computed, 
    onMounted,
    reactive,
    provide
  } from 'vue'
  import { useRouter } from 'vue-router'
  import MonthSelect from 'components/month-select.vue'
  import { Params } from './types'
  import { today } from 'src/serv/datetime'

  export default defineComponent({
    components: {
      MonthSelect
    },
    setup () {
      const now = today()
      const params = reactive<Params>({
        year: now.getFullYear(),
        month: now.getMonth()
      })

      provide('params', params)

      const menus = [
        { label: 'Laba Rugi', 
          icon: 'sync_alt', 
          path: 'laba_rugi', 
          color: 'green',
          description: 'laporan keuangan yang dapat mengetahui jumlah total pendapatan dan pengeluaran baik harga pokok penjualan maupun biaya operasional.' },
        { label: 'Neraca', 
          icon: 'scale',
          path: 'neraca',
          color: 'blue',
          description: 'bagian dari laporan keuangan dari entitas bisnis atau perusahaan yang mencatat informasi tentang aset, kewajiban, dan ekuitas pemegang saham pada waktu tertentu.'
        },
        { label: 'Arus Kas', icon: 'ait', path: 'arus_kas' },
      ]

      const router = useRouter()

      return {
        params,
        menus
      }
    }
  })
</script>

<template>
  <q-page>
    <q-toolbar class="q-px-lg bg-grey-2">
      <q-toolbar-title class="text-weight-bold">
        Laporan Keuangan
      </q-toolbar-title>
      <month-select
        v-model:year="params.year"
        v-model:month="params.month"
      />
    </q-toolbar>
    <q-separator/>
    
    <section class="q-px-lg q-my-md">
      <router-view/>
    </section>
  </q-page>
</template>