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
              <h6 class="q-my-none q-py-none">Data Pembelian dan Penjualan bulan September 2021</h6>
            </q-card-section>
            <q-separator/>
            <q-card-section>
              <div id="chart-container">
                <line-chart :data="{'2017-05-13': 2, '2017-05-14': 5}"></line-chart>
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
  defineComponent
} from 'vue'
// import { Chart, registerables } from 'chart.js'
// Chart.register(...registerables)

export default defineComponent({
  setup(props) {
    return {}
  }
})
</script>
