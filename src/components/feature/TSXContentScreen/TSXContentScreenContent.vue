<template>
  <div class="overflow-y-auto px-6 pb-6 flex-auto">
    <div class="markdown-body ">
      <div
        v-if="!apiError"
        class="richTextContent"
        :class="[
          `richTextContent--${type}`,
        ]"
        v-html="content"
      />
      <div v-if="apiError" class="text-error-high text-sm">
        {{ apiError }}
      </div>
    </div>
  </div>
  <div
    v-if="type === 'marketing' && meta.cta && fetchedURL && fetchedURL.length"
    class="p-4"
  >
    <a
      class="inline-flex items-center justify-center transition-all duration-300 cursor-pointer border-0 focus:outline-none p-3 w-full rounded mb-3 text-white bg-marketing hover:bg-marketing-hover"
      :href="fetchedURL"
      :target="meta.cta.target || '_blank'"
    >
      {{ meta.cta.label || 'Click here' }}
    </a>
    <div v-if="meta.cta.subline" class="rounded border border-gray-200 py-2 px-3 text-center font-medium text-content-body">
      {{ meta.cta.subline }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, ref} from 'vue'
import GuideClient from '@webpros/koality-guide-client'
import { marked } from 'marked'

export interface Props {
  contentId: string
  language?: string
  type?: 'advisor' | 'kAdvisor' | 'marketing' | 'content'
  partnerShopUrl?: string
  debug: boolean
}

const props = withDefaults(defineProps<Props>(), {
  language: 'en',
  contentId: '',
  type: 'content',
  partnerShopUrl: '',
  debug: false
})

const content = ref<string>()
const meta = ref<any>({})
const apiError = ref<any>()

const client = new GuideClient('md')

const fetchContent = async () => {
  try {
    const guide = await client.getGuide(props.contentId, props.language)
    const contentText = guide.getText()
    content.value = marked(contentText)
    const {buttons, cta} = guide.getMetaInformation()
    meta.value = {
      buttons: buttons || [],
      cta: cta ? cta[0] : null
    }
    if (props.debug) {
      console.log('ContentScreen Meta', meta.value)
      console.log('ContentScreen content', content.value)
    }
  } catch (err) {
    console.error(err)
    apiError.value = err
  }
}

const fetchedURL = computed(() => {
  const url = props.partnerShopUrl?.length && meta.value.cta.partnerUrl
    ? props.partnerShopUrl
    : meta.value.cta.url
  if (props.debug) console.log('ContentScreen fetchedURL', url)
  return url
})

fetchContent()

if (props.debug) {
  console.log('ContentScreen Props', props)
}
</script>
