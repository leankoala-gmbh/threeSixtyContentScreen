<script lang="ts" setup>
import CloseScreenButton from '@/components/base/CloseScreenButton/CloseScreenButton.vue'
const emit = defineEmits(['closeScreen'])

const props = defineProps({
  title: {
    type: String,
    default: 'You have discovered a pro feature'
  },
  label: {
    type: String,
    default: 'Pro'
  },
  contentUrl: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="flex flex-col mobileFullHeight">
    <div
      class="px-6 pt-6 h-full"
    >
      <header class="flex justify-end relative mb-8">
        <CloseScreenButton @click="$emit('closeScreen')" />
      </header>
      <iframe
        :src="contentUrl"
        class="w-full h-full"
      />
    </div>
  </div>
</template>
