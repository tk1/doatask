import { createApp } from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router'
import register from './plugins/register'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Toast from 'primevue/toast'
import Dialog from 'primevue/dialog'
import TabMenu from 'primevue/tabmenu'
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import Checkbox from 'primevue/checkbox'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Message from 'primevue/message'
import Avatar from 'primevue/avatar'
import ProgressBar from 'primevue/progressbar'
import Textarea from 'primevue/textarea'
import ToggleButton from 'primevue/togglebutton'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import Tooltip from 'primevue/tooltip'
import TriStateCheckbox from 'primevue/tristatecheckbox'
import Menu from 'primevue/menu'
import FileUpload from 'primevue/fileupload'
import Rating from 'primevue/rating'
import Chart from 'primevue/chart'
import RadioButton from 'primevue/radiobutton'
import Slider from 'primevue/slider'
import Chips from 'primevue/chips'
import Toolbar from 'primevue/toolbar'
import Card from 'primevue/card'

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

import TaskEditBase from './components/TaskEditBase.vue'
import TaskSolveBase from './components/TaskSolveBase.vue'
import MarkDown from './components/MarkDown.vue'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(PrimeVue)
app.use(ToastService)

register(app)

app.component('Button', Button)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('InputText', InputText)
app.component('Password', Password)
app.component('Toast', Toast)
app.component('Dialog', Dialog)
app.component('TabMenu', TabMenu)
app.component('Dropdown', Dropdown)
app.component('Calendar', Calendar)
app.component('Checkbox', Checkbox)
app.component('TabView', TabView)
app.component('TabPanel', TabPanel)
app.component('Message', Message)
app.component('Avatar', Avatar)
app.component('ProgressBar', ProgressBar)
app.component('Textarea', Textarea)
app.component('ToggleButton', ToggleButton)
app.component('Splitter', Splitter)
app.component('SplitterPanel', SplitterPanel)
app.component('TriStateCheckbox', TriStateCheckbox)
app.component('Menu', Menu)
app.component('FileUpload', FileUpload)
app.component('Rating', Rating)
app.component('Chart', Chart)
app.component('RadioButton', RadioButton)
app.component('Slider', Slider)
app.component('Chips', Chips)
app.component('Toolbar', Toolbar)
app.component('Card', Card)

app.component('TaskEditBase', TaskEditBase)
app.component('TaskSolveBase', TaskSolveBase)
app.component('MarkDown', MarkDown)

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
