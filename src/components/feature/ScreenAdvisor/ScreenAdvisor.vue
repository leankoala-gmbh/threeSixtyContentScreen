<script lang="ts" setup>
defineEmits(['closeScreen'])

defineProps({
  title: {
    type: String,
    default: 'Advisor'
  },
  contentId: {
    type: String,
    default: ''
  },
  partnerShopUrl: {
    type: String,
    default: ''
  },
  headerType: {
    type: String,
    default: 'advisor'
  }
})
</script>

<template>
  <div class="flex flex-col mobileFullHeight">
    <div class="px-6 pt-6 mb-8">
      <header class="flex justify-between relative">
        <div class="flex items-center">
          <Brandheader
            :header-type="headerType"
          />
          <span class="font-medium text-2xl pl-4">{{ title.length ? title : 'Advisor' }}</span>
        </div>
        <CloseScreenButton @click="$emit('closeScreen')" />
      </header>
    </div>
    <TSXContentScreenContent
      :content-id="contentId"
      type="advisor"
      :partner-shop-url="partnerShopUrl"
    />
  </div>
</template>
