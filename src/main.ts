import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import '../colors.css'

import { defineCustomElement } from 'vue'
import TSXContentScreen from './components/feature/TSXContentScreen/TSXContentScreen.ce.vue'
import TSXContentScreenTrigger from './components/feature/TSXContentScreenTrigger/TSXContentScreenTrigger.ce.vue'

const ContentScreen = defineCustomElement(TSXContentScreen)
const ContentScreenTrigger = defineCustomElement(TSXContentScreenTrigger)
customElements.define('tsx-contentscreen', ContentScreen)
customElements.define('tsx-contentscreen-trigger', ContentScreenTrigger)



const app = createApp(App)

app.mount('#app')

