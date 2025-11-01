import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/css/nucleo-icons.css'
import './assets/css/nucleo-svg.css'

import './assets/js/nav-pills.js'
import './assets/js/ripple-effect.js'
import './assets/scss/material-dashboard.scss'
import 'devextreme/dist/css/dx.fluent.blue.light.css'
import './assets/css/style-generics.css'

import config from 'devextreme/core/config'
import './firebase/firebase'
import { licenseKey } from './devextreme-license'

config({ licenseKey })

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
