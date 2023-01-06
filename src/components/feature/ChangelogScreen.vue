<script setup lang="ts">
import CloseScreen from '@/components/base/CloseScreen.vue'
import {translator} from '@/composables/translatior'

const emit = defineEmits(['closeScreen'])

const props = defineProps({
  title: {
    type: String,
    default: 'What\'s new'
  }
})
</script>

<template>
  <div class="flex flex-col mobileFullHeight">
    <div
      class="px-6 pt-6 mb-8 bg-blueGray-100"
    >
      <header class="flex justify-between relative">
        <span class="font-medium text-2xl pl-4">{{ title }}</span>
        <div>
          {{ translator('Open changelog') }}
          <svg
            width="32"
            height="32"
            viewBox="0 0 16 16"
          ><path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M8.25 2.75h-5.5v10.5h10.5v-5.5m0-5l-5.5 5.5m3-6.5h3.5v3.5"
          /></svg>
        </div>
        <CloseScreen @click="$emit('closeScreen')" />
      </header>
    </div>
  </div>
</template>
