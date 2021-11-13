<script lang="ts">
  import {
    defineComponent,
    ref,
    reactive,
    inject,
    onMounted
  } from 'vue'
  import { useQuasar } from 'quasar'
  import { Params } from './types'
  import MonthSelect from 'components/month-select.vue'
  import RupiahInput from 'components/rupiah-input.vue'
  import { usePOST } from 'src/compose/axios'

  export default defineComponent({
    emits: ['success-snapshot', 'fail-snapshot'],
    components: {
      RupiahInput,
      MonthSelect
    },
    setup(props, { emit }) {
      const quasar = useQuasar()
      const today = new Date()
      const showSnapshotDialog = ref(false)
      const snapshotPayload = reactive({
        month: today.getDate(),
        year: today.getFullYear(),
        pajak: '0'
      })

      const dateParams = inject<Params>('params')

      function showDialog() {
        showSnapshotDialog.value = true
      }

      function onSuccessSnapshot(data: any) {
        quasar.notify({
          type: 'positive',
          message: 'Sukses membuat laporan Keuangan'
        })
        emit('success-snapshot')
      }

      function onFailSnapshot(error: any) {
        quasar.notify({
          type: 'negative',
          message: 'Gagal membuat laporan Keuangan'
        })
        emit('fail-snapshot')
      }

      const {
        result,
        post: snapshotReport
      } = usePOST<any>({
        url: '/v1/api/finance/report',
        payload: snapshotPayload,
        onSuccess: onSuccessSnapshot,
        onFail: onFailSnapshot
      })

      onMounted(() => {
        if (!dateParams) {
          alert('terjadi kesalahan')
          return
        }
        snapshotPayload.month = dateParams.month
        snapshotPayload.year = dateParams.year
      })

      return {
        showSnapshotDialog,
        snapshotPayload,
        showDialog,
        snapshotReport
      }
    }
  })
</script>

<template>
  <q-btn 
    color="primary" 
    label="Buat Laporan"
    @click="showDialog"
  >
  </q-btn>
  <q-dialog v-model="showSnapshotDialog">
    <q-card style="width: 500px;">
      <q-card-section>
        <h6 class="q-my-none">Form Laporan Keuangan</h6>
      </q-card-section>
      <q-separator/>
      <q-card-section>
        <month-select
          class="q-mb-md"
          v-model:month="snapshotPayload.month"
          v-model:year="snapshotPayload.year"
        />
        <rupiah-input
          v-model="snapshotPayload.pajak"
          label="pajak"
        />
      </q-card-section>
      <q-separator/>
      <q-card-section>
        <q-btn 
          @click="snapshotReport"
          unelevated 
          color="primary" 
          label="submit"
        ></q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>