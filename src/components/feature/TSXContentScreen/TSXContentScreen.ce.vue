<template>
  <div class="contentScreenWrapper">
    <div
      class="screenOverlay fixed h-screen w-screen bg-trans-black-08 top-0 right-0 transition-opacity duration-300 ease-in-out"
      :class="[isOpenGuide ? 'screenOverlay--open': '']"
      @click="$emit('closeScreen')"
    />
    <transition name="cardSlideRight">
      <div
        v-if="isOpenGuide"
        ref="guide"
        class="fixed top-0 right-0 overflow-hidden bg-white rounded-lg shadow-lg guideScreen transition-all duration-300 ease-in-out z-1m outerFullHeight z-[100]"
      >
        <div class="flex flex-col mobileFullHeight">
          <div class="markdown-body flex-auto overflow-y-scroll p-4">
            <TSXHeaderAdvisor />
            <TSXContentScreenContent
              v-if="isOpenGuide"
              :content-id="contentId"
              :language="language"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import { onClickOutside } from '@vueuse/core'
import mitt from 'mitt'
import TSXContentScreenContent from './TSXContentScreenContent.vue'
import {IContentConfig} from '@/types/general'
import TSXHeaderAdvisor from '@/components/feature/TSXContentScreen/TSXHeaderAdvisor.vue'

declare global {
  interface Window {
    mitt?: any
  }
}

const guide = ref(null)
const isOpenGuide = ref(false)
const contentId = ref('')
const language = ref('en')
const type = ref('content')
window.mitt = window.mitt || mitt()
const body = document.querySelector('body')

const openGuide = () => {
  body!.style.overflow = 'hidden'
  isOpenGuide.value = true
}

const closeGuide = () => {
  isOpenGuide.value = false
  contentId.value = ''
  language.value = 'en'
  type.value = 'content'
  body!.style.overflow = ''
}

window.mitt.on('tsxContentScreenConfig', (payload: IContentConfig) => {
  contentId.value = payload.contentId
  language.value = payload.language || 'en'
  type.value = payload.type
  openGuide()
})

onClickOutside(guide, event => closeGuide())
</script>

<style lang="postcss">
@import '../../../assets/output.css';
</style>
