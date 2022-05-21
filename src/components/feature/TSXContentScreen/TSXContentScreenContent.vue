<template>
  <div>
    <div
      v-if="!apiError"
      class="content"
      v-html="content"
    />
    <div v-if="guideButtons.length" class="mt-4 flex gap-4">
      <a
        v-for="(button, index) in guideButtons"
        :key="index"
        :href="button.url"
        :target="button.target ? button.target : '_blank'"
        class="bg-primary-regular hover:bg-primary-500 py-2 px-3 text-white cursor-pointer font-light"
      >
        {{ button.label }}
      </a>
    </div>
    <div v-if="apiError" class="text-error-high text-sm">
      {{ apiError }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import GuideClient from '@webpros/koality-guide-client'
import { marked } from 'marked'
import {IContentConfig} from '@/types/general'

interface IGuideButton {
  text: string
  url: string
  target?: string
}

const props = withDefaults(defineProps<IContentConfig>(), {
  language: 'en'
})

const content = ref<string>()
const guideButtons = ref<IGuideButton[]|any[]>([])
const apiError = ref<any>()

const client = new GuideClient('md')

const fetchContent = async () => {
  try {
    const guide = await client.getGuide(props.contentId, props.language)
    const {content, meta} = guide.getText()
    content.value = marked(content)
    guideButtons.value = meta?.buttons ? meta.buttons : []
  } catch (err) {
    console.error(err)
    apiError.value = err
  }
}

fetchContent()
</script>
