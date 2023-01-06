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
        <ChangelogScreen
          v-if="type ==='changelog'"
          :title="title"
          @close-screen="closeScreen"
        />
        <div v-else class="flex flex-col mobileFullHeight">
          <div
            class="px-6 pt-6 mb-8"
            :class="[
              type === 'changelog' ? 'bg-blueGray-100': ''
            ]"
          >
            <header class="flex justify-between relative">
              <TSXHeaderKoalityAdvisor
                v-if="type === 'koality'"
                :title="title"
              />
              <TSXHeaderAdvisor
                v-if="type === 'advisor'"
                :title="title"
              />
              <TSXHeaderMarketing
                v-if="type === 'marketing'"
                :title="title"
                :label="label"
              />
              <TSXHeaderChangelog
                v-if="type ==='changelog'"
                :title="title"
                :changelog-link="sddd"
              />
              <div v-if="type === 'content'" />
              <CloseScreen @click="closeScreen" />
            </header>
          </div>
          <TSXContentScreenContent
            v-if="isOpenGuide && contentId && !(contentUrl?.length || changelogContent?.length)"
            :content-id="contentId"
            :iframe-button-label="iframeButtonLabel"
            :iframe-url="iframeUrl"
            :language="language"
            :type="type"
            :partner-shop-url="partnerShopUrl"
            :debug="debug"
          />
          <div v-if="contentUrl" class=" px-6 pb-6 flex-auto">
            <iframe
              :src="contentUrl"
              class="w-full h-full"
            />
          </div>
          <div v-if="changelogContent" v-html="changelogContent" />
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
import TSXHeaderKoalityAdvisor from '@/components/feature/TSXContentScreen/TSXHeaderKoalityAdvisor.vue'
import TSXHeaderChangelog from '@/components/feature/TSXContentScreen/TSXHeaderChangelog.vue'
import CloseScreen from '@/components/base/CloseScreen.vue'
import ChangelogScreen from '@/components/feature/ChangelogScreen.vue'

declare global {
  interface Window {
    mitt?: any
  }
}

const props = defineProps({
  debug: {
    type: Boolean,
    default: false
  }
})

const guide = ref(null)
const isOpenGuide = ref(false)
const isActiveBackground = ref(false)
const contentId = ref('')
const contentUrl = ref('')
const language = ref('en')
const title = ref<string|undefined>('')
const label = ref<string|undefined>('')
const type = ref<string|undefined>('content')
const iframeButtonLabel = ref<string|null>(null)
const iframeUrl = ref<string|null>(null)
const changelogContent = ref<string|null>(null)
const partnerShopUrl = ref<string|undefined>('')
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
    contentUrl.value = ''
    title.value = ''
    label.value = ''
    language.value = 'en'
    type.value = 'advisor'
    partnerShopUrl.value = ''
    iframeButtonLabel.value = null
    iframeUrl.value = null
    changelogContent.value = null
  }, 300)
}

window.mitt.on('tsxContentScreenConfig', (payload: IContentConfig) => {
  contentUrl.value = payload.contentUrl || ''
  contentId.value = payload.contentId || ''
  language.value = payload.language || 'en'
  type.value = payload.type || 'advisor'
  label.value = payload.label || 'pro'
  title.value = payload.title?.length ? payload.title : undefined
  partnerShopUrl.value = payload.partnerShopUrl?.length ? payload.partnerShopUrl : undefined
  iframeUrl.value = payload.iframeUrl?.length ? payload.iframeUrl : null
  iframeButtonLabel.value = payload.iframeButtonLabel?.length ? payload.iframeButtonLabel : null
  changelogContent.value = payload.changelogContent?.length ? payload.changelogContent : null
  openScreen()
})

onClickOutside(guide, event => closeScreen())
</script>

<style lang="postcss">
@import '../../../assets/output.css';
</style>
