import { createApp } from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router'
import register from './plugins/register'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Card from 'primevue/card'
import Chart from 'primevue/chart'
import Checkbox from 'primevue/checkbox'
import Chips from 'primevue/chips'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import FileUpload from 'primevue/fileupload'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Menu from 'primevue/menu'
import Message from 'primevue/message'
import Password from 'primevue/password'
import ProgressBar from 'primevue/progressbar'
import ProgressSpinner from 'primevue/progressspinner'
import RadioButton from 'primevue/radiobutton'
import Rating from 'primevue/rating'
import Slider from 'primevue/slider'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import TabMenu from 'primevue/tabmenu'
import TabPanel from 'primevue/tabpanel'
import TabView from 'primevue/tabview'
import Textarea from 'primevue/textarea'
import Toast from 'primevue/toast'
import ToggleButton from 'primevue/togglebutton'
import Toolbar from 'primevue/toolbar'
import Tooltip from 'primevue/tooltip'
import TriStateCheckbox from 'primevue/tristatecheckbox'

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

import MarkDown from './components/MarkDown.vue'
import TaskEditBase from './components/TaskEditBase.vue'
import TaskSolveBase from './components/TaskSolveBase.vue'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(PrimeVue)
app.use(ToastService)

register(app)

app.component('Avatar', Avatar)
app.component('Button', Button)
app.component('Calendar', Calendar)
app.component('Card', Card)
app.component('Chart', Chart)
app.component('Checkbox', Checkbox)
app.component('Chips', Chips)
app.component('Column', Column)
app.component('DataTable', DataTable)
app.component('Dialog', Dialog)
app.component('Dropdown', Dropdown)
app.component('FileUpload', FileUpload)
app.component('InputNumber', InputNumber)
app.component('InputText', InputText)
app.component('Menu', Menu)
app.component('Message', Message)
app.component('Password', Password)
app.component('ProgressBar', ProgressBar)
app.component('ProgressSpinner', ProgressSpinner)
app.component('RadioButton', RadioButton)
app.component('Rating', Rating)
app.component('Slider', Slider)
app.component('Splitter', Splitter)
app.component('SplitterPanel', SplitterPanel)
app.component('TabMenu', TabMenu)
app.component('TabPanel', TabPanel)
app.component('TabView', TabView)
app.component('Textarea', Textarea)
app.component('Toast', Toast)
app.component('ToggleButton', ToggleButton)
app.component('Toolbar', Toolbar)
app.component('TriStateCheckbox', TriStateCheckbox)

app.component('MarkDown', MarkDown)
app.component('TaskEditBase', TaskEditBase)
app.component('TaskSolveBase', TaskSolveBase)

app.directive('tooltip', Tooltip)

app.config.globalProperties.$filters = {
  toNatural (v) {
    let n = Number(v)
    if (isNaN(n)) {
      return 1
    }
    n = Math.max(1, Math.floor(Math.abs(n)))
    return n
  },
  formatPercent (amount, digits) {
    if (typeof digits !== 'number') {
      digits = 1
    };
    if (amount === undefined) {
      amount = 0
    }
    return Number(100 * amount).toFixed(digits) + ' %'
  }
}
app.config.globalProperties.$production = import.meta.env.PROD

app.mount('#app')
