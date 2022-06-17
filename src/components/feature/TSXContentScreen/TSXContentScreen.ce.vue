<template>
  <div class="contentScreenWrapper">
    <div
      class="screenOverlay fixed h-screen w-screen bg-trans-black-08 top-0 right-0 transition-opacity duration-300 ease-in-out"
      :class="[isActiveBackground ? 'screenOverlay--open': '']"
      @click="$emit('closeScreen')"
    />
    <transition name="slide">
      <div
        v-if="isOpenGuide"
        ref="guide"
        class="fixed top-0 right-0 overflow-hidden bg-white rounded-lg shadow-lg guideScreen transition-all duration-300 ease-in-out z-1m outerFullHeight z-[10001]"
      >
        <div class="flex flex-col mobileFullHeight">
          <div class="px-6 pt-6 mb-8">
            <header class="flex justify-between relative">
              <TSXHeaderAdvisor
                v-if="type === 'advisor'"
                :title="title"
              />
              <TSXHeaderMarketing
                v-if="type === 'marketing'"
                :title="title"
              />
              <div v-if="type === 'content'" />
              <div
                class="text-gray-500 hover:text-gray-500 transition duration-300 cursor-pointer"
                @click="closeScreen"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  class="w-4"
                >
                  <path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" fill="currentColor" />
                </svg>
              </div>
            </header>
          </div>

          <TSXContentScreenContent
            v-if="isOpenGuide"
            :content-id="contentId"
            :language="language"
            :type="type"
          />
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
import TSXHeaderMarketing from '@/components/feature/TSXContentScreen/TSXHeaderMarketing.vue'

declare global {
  interface Window {
    mitt?: any
  }
}

const guide = ref(null)
const isOpenGuide = ref(false)
const isActiveBackground = ref(false)
const contentId = ref('')
const language = ref('en')
const title = ref<string|undefined>('')
const label = ref<string|undefined>('')
const type = ref<string|undefined>('content')
window.mitt = window.mitt || mitt()
const body = document.querySelector('body')

const openScreen = () => {
  body!.style.overflow = 'hidden'
  isActiveBackground.value = true
  setTimeout(() => {
    isOpenGuide.value = true
  }, 300)
}

const closeScreen = () => {
  isOpenGuide.value = false
  setTimeout(() => {
    isActiveBackground.value = false
    body!.style.overflow = ''
    contentId.value = ''
    title.value = ''
    label.value = ''
    language.value = 'en'
    type.value = 'advisor'
  }, 300)
}

window.mitt.on('tsxContentScreenConfig', (payload: IContentConfig) => {
  contentId.value = payload.contentId
  language.value = payload.language || 'en'
  type.value = payload.type || 'advisor'
  label.value = payload.label || 'pro'
  title.value = payload.title?.length ? payload.title : undefined
  openScreen()
})

onClickOutside(guide, event => closeScreen())
</script>

<style lang="postcss">
@import '../../../assets/output.css';
</style>
