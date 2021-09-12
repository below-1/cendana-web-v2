import { boot } from 'quasar/wrappers';
import VueChartKick from 'vue-chartkick'
import 'chartkick/chart.js'

export default boot(({ app }) => {
  app.use(VueChartKick as any)
})
