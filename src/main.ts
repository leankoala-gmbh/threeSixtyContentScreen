// import { createApp } from 'vue'
// import App from './App.vue'
// import './assets/index.css'
//
// const app = createApp(App)
//
// app.mount('#app')
//

import { defineCustomElement } from 'vue'
import Advisor from './components/feature/Advisor/Advisor.ce.vue'
import Trigger from './components/feature/AdvisorTrigger/AdvisorTrigger.ce.vue'

const AdvisorElement = defineCustomElement(Advisor)
const AdvisorTrigger = defineCustomElement(Trigger)
customElements.define('advisor-element', AdvisorElement)
customElements.define('advisor-trigger', AdvisorTrigger)
