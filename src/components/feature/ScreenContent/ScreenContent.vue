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
  contentUrl: {
    type: String,
    default: ''
  },
  brandType: {
    type: String,
    default: ''
  }
})
const closeScreen = () => {
  window.mitt.emit('tsxContentScreenEvents', {
    action: 'closeScreenIframe'
  })
  emit('closeScreen')
}
</script>

<template>
  <div class="flex flex-col mobileFullHeight">
    <div
      class="px-6 pt-6 h-full"
    >
      <header class="flex justify-between relative mb-8">
        <div v-if="title" class="flex items-center">
          <Brandheader
            v-if="brandType"
            :header-type="brandType"
            class="pr-4"
          />
          <span class="font-medium text-2xl">
            {{ title }}
          </span>
        </div>
        <CloseScreenButton @click="closeScreen" />
      </header>
      <iframe
        :src="contentUrl"
        class="w-full h-full"
      />
    </div>
  </div>
</template>
