<script lang="ts" setup>
import { IContentConfig, TScreenTypes } from '@/types/general'
import mitt from 'mitt'

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
const type = ref<TScreenTypes|undefined>('content')
const iframeButtonLabel = ref<string>('')
const brandType = ref<string|undefined>('')
const iframeUrl = ref<string>('')
const changelogUrl = ref<string>('')
const changelogEndpoints = ref<string>('')
const partnerShopUrl = ref<string|undefined>('')

window.mitt = window.mitt || mitt()
const body = document.querySelector('body')

useTranslator().setLanguage(language.value)

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
    iframeButtonLabel.value = ''
    iframeUrl.value = ''
    changelogUrl.value = ''
    changelogEndpoints.value = ''
    brandType.value = ''
  }, 300)
}

window.mitt.on('tsxContentScreenConfig', (payload: IContentConfig) => {
  console.log('tsxContentScreenConfig', payload)
  contentUrl.value = payload.contentUrl || ''
  contentId.value = payload.contentId || ''
  language.value = payload.language || 'en'
  type.value = payload.type || 'advisor'
  label.value = payload.label || 'pro'
  title.value = payload.title?.length ? payload.title : undefined
  partnerShopUrl.value = payload.partnerShopUrl?.length ? payload.partnerShopUrl : undefined
  iframeUrl.value = payload.iframeUrl?.length ? payload.iframeUrl : ''
  iframeButtonLabel.value = payload.iframeButtonLabel?.length ? payload.iframeButtonLabel : ''
  changelogUrl.value = payload.changelogUrl?.length ? payload.changelogUrl : ''
  changelogEndpoints.value = payload.changelogEndpoints ? payload.changelogEndpoints : ''
  brandType.value = payload.brandType?.length ? payload.brandType : ''
  openScreen()
})

onClickOutside(guide, event => closeScreen())

</script>

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
        <ScreenChangelog
          v-if="type === 'changelog'"
          :title="title"
          :changelog-url="changelogUrl"
          :changelog-endpoints="changelogEndpoints"
          @close-screen="closeScreen"
        />
        <ScreenAdvisor
          v-if="type && ['advisor', 'koality'].includes(type)"
          :header-type="type"
          :title="title"
          :content-id="contentId"
          :partner-shop-url="partnerShopUrl"
          @close-screen="closeScreen"
        />
        <ScreenMarketing
          v-if="type === 'marketing'"
          :title="title"
          :content-id="contentId"
          :iframe-button-label="iframeButtonLabel"
          :iframe-url="iframeUrl"
          @close-screen="closeScreen"
        />
        <ScreenContent
          v-if="type === 'content'"
          :content-url="contentUrl"
          :title="title"
          :brand-type="brandType"
          @close-screen="closeScreen"
        />
      </div>
    </transition>
  </div>
</template>

<style lang="postcss">
@import '../../../assets/output.css';
</style>
