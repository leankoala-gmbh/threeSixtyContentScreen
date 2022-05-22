<template>
  <div class="overflow-y-scroll px-6 pb-6 flex-auto">
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
  <div v-if="type === 'marketing' && ctaButtons?.length" class="p-4">
    <a
      class="inline-flex items-center justify-center transition-all duration-300 cursor-pointer border-0 focus:outline-none p-3 w-full rounded mb-3 text-white bg-marketing hover:bg-marketing-hover"
      :href="ctaButtons[0].url"
      :target="ctaButtons[0].target"
    >
      {{ ctaButtons[0].label }}
    </a>
    <div class="rounded border border-gray-200 py-2 px-3 text-center font-medium text-content-body">
      Start FREE 14-day PRO trial
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import GuideClient from '@webpros/koality-guide-client'
import { marked } from 'marked'

interface IGuideButton {
  text: string
  url: string
  target?: string
}

export interface Props {
  contentId: string
  language?: string
  type?: 'advisor' | 'marketing' | 'content'
}

const props = withDefaults(defineProps<Props>(), {
  language: 'en',
  contentId: '',
  type: 'content'
})

const content = ref<string>()
const ctaButtons = ref()
const apiError = ref<any>()

const client = new GuideClient('md')

const fetchContent = async () => {
  try {
    const guide = await client.getGuide(props.contentId, props.language)
    const contentText = guide.getText()
    content.value = marked(contentText)
    const { buttons } = guide.getMetaInformation()
    ctaButtons.value = buttons || null
  } catch (err) {
    console.error(err)
    apiError.value = err
  }
}

fetchContent()
</script>
