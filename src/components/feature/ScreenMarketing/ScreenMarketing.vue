<script lang="ts" setup>
const emit = defineEmits(['closeScreen'])

defineProps({
  title: {
    type: String,
    default: 'You have discovered a pro feature'
  },
  label: {
    type: String,
    default: 'Pro'
  },
  contentId: {
    type: String,
    default: ''
  },
  iframeUrl: {
    type: String,
    default: ''
  },
  iframeButtonLabel: {
    type: String,
    default: ''
  }
})

const closeScreen = () => {
  window.mitt.emit('tsxContentScreenEvents', {
    action: 'closeScreenMarketing'
  })
  emit('closeScreen')
}
</script>

<template>
  <div class="flex flex-col mobileFullHeight">
    <div class="px-6 pt-6">
      <header class="flex justify-between relative mb-8">
        <div class="flex items-center">
          <div class="rounded uppercase text-white font-medium bg-marketing text-sm px-2 py-1 mr-2">
            {{ label?.length ? label : 'Pro' }}
          </div>
          <div class="font-bold text-sm uppercase">
            {{ title?.length ? title : 'You have discovered a pro feature' }}
          </div>
        </div>
        <CloseScreenButton @click="closeScreen" />
      </header>
    </div>
    <TSXContentScreenContent
      :content-id="contentId"
      type="marketing"
      :iframe-button-label="iframeButtonLabel"
      :iframe-url="iframeUrl"
    />
  </div>
</template>
