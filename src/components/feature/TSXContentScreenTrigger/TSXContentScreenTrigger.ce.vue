<template>
  <div class="inline-block" @click="trigger">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import mitt from 'mitt'
import {IContentConfig} from '@/types/general'

declare global {
  interface Window {
    mitt?: any;
  }
}

const props = withDefaults(defineProps<IContentConfig>(), {
  contentId: '',
  language: 'en',
  type: 'content'
})

window.mitt = window.mitt || mitt()

const trigger = () => {
  window.mitt.emit('tsxContentScreenConfig', {
    contentId: props.contentId,
    language: props.language,
    type: props.type
  })
}

</script>
