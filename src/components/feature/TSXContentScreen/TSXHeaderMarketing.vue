<template>
  <div class="flex items-center">
    <div class="rounded uppercase text-white font-medium bg-marketing text-sm px-2 py-1 mr-2">
      {{ label }}
    </div>
    <div class="font-bold text-sm uppercase">
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TSXHeaderAdvisor',
  props: {
    title: {
      type: String,
      default: 'You have discovered a pro feature'
    },
    label: {
      type: String,
      default: 'Pro'
    }
  }
}
</script>
