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
  contentId: string
  language?: string
  title?: string
  type?: 'advisor' | 'marketing' | 'content' | undefined
}

const props = withDefaults(defineProps<Props>(), {
  contentId: '',
  title: '',
  language: 'en',
  type: 'advisor'
})

window.mitt = window.mitt || mitt()

const trigger = () => {
  window.mitt.emit('tsxContentScreenConfig', {
    contentId: props.contentId,
    language: props.language,
    type: props.type,
    title: props.title
  })
}

</script>
