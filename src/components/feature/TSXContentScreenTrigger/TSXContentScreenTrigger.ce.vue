<template>
  <div class="inline-block" @click="trigger">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import mitt from 'mitt'

declare global {
  interface Window {
    mitt?: any;
  }
}

export interface Props {
  contentId?: string
  contentUrl?: string
  language?: string
  title?: string
  type?: 'advisor' | 'marketing' | 'content' | undefined
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  contentId: '',
  contentUrl: '',
  title: '',
  language: 'en',
  type: 'advisor',
  label: 'pro'
})

window.mitt = window.mitt || mitt()

const trigger = () => {
  window.mitt.emit('tsxContentScreenConfig', {
    contentUrl: props.contentUrl,
    contentId: props.contentId,
    language: props.language,
    type: props.type,
    title: props.title,
    label: props.label
  })
}

</script>
