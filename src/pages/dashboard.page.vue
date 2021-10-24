<template>
  <q-page>

    <section class="q-pa-md">
      <div class="row">
        <div class="col-12">
          <q-card bordered flat>
            <q-card-section>
              <h6 class="q-my-none q-py-none">Daftar Hutang Yang Jatuh Tempo Hari ini</h6>
            </q-card-section>
            <q-separator/>
          </q-card>
        </div>
      </div>
    </section>

    <section class="q-pa-md">
      <div class="row">
        <div class="col-12">
          <q-card bordered flat>
            <q-card-section>
              <h6 class="q-my-none q-py-none">
                Data Pemasukan dan Pengeluaran bulan {{formattedMonth}}
              </h6>
              <div class="q-px-lg flex q-py-md">
                <month-select 
                  v-model:year="report1Params.year"
                  v-model:month="report1Params.month"
                />
              </div>
            </q-card-section>
            <q-separator/>
            <q-card-section>
              <div id="chart-container">

                <BarChart :chartData="report1ChartData" />
                <!-- <line-chart 
                  :data="incomeData"
                  decimal="."
                ></line-chart> -->
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  watch,
  onMounted,
  computed,
  ref
} from 'vue'
import { format } from 'date-fns'
import { id as localeID } from 'date-fns/locale'
import { currentYearMonth } from 'src/serv/datetime'
import MonthSelect from 'components/month-select.vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import { BarChart } from 'vue-chart-3';

export default defineComponent({
  components: {
    MonthSelect,
    BarChart,
  },
  setup(props) {
    const report1Params = reactive({...currentYearMonth()})
    const formattedMonth = computed(() => {
      const d = new Date(report1Params.year, report1Params.month, 1)
      return format(d, 'MMMM yyyy', { locale: localeID })
    })
    const quasar = useQuasar()
    const report1 = ref<any[]>([])
    const delays = ref<any[]>([])

    async function loadReport1(params: { year: number, month: number }) {
      try {
        const response = await api.get(`/v1/api/summary/report1`, {
          params: {
            year: params.year,
            month: params.month
          }
        })
        report1.value = response.data
      } catch (err) {
        console.log(err)
        quasar.notify({
          type: 'negative',
          message: 'Gagal mengambil data rangkuman pembelian dan penjualan'
        })
      }
    }

    async function loadDelaysDueToday() {
      try {
        const response = await api.get(`/v1/api/delays/due-today`, {
          params: {
            kind: 'RECEIVABLE'
          }
        })
        delays.value = response.data
      } catch (err) {
        console.log(err)
        quasar.notify({
          type: 'negative',
          message: 'Gagal mengambil data piutang'
        })
      }
    }

    const report1ChartData = computed(() => {
      const labels = report1.value.map((it: any, index) => index + 1)
      const datasets = [
        {
          label: 'Pemasukan',
          data: report1.value.map((it: any) => it.total_debit),
          backgroundColor: '#11324D'
        },
        {
          label: 'Pengeluaran',
          data: report1.value.map((it: any) => it.total_credit),
          backgroundColor: '#986D8E'
        }
      ]
      return {
        labels,
        datasets
      }
    })

    watch(report1Params, (params: any) => {
      loadReport1(params)
    })

    onMounted(() => {
      loadReport1({ ...report1Params })
      loadDelaysDueToday()
    })

    const testData = {
      labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
      datasets: [
        {
          data: [30, 40, 60, 70, 5],
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
        },
      ],
    };


    return {
      report1Params,
      report1,
      report1ChartData,
      testData,
      formattedMonth
    }
  }
})
</script>
