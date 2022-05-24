<template>
  <div>
    <div class="mb-10">
      <TSXContentScreenTrigger
        content-id="html.deadlink.404"
      >
        Open Advisor
      </TSXContentScreenTrigger>
    </div>
    <div>
      <TSXContentScreenTrigger
        content-id="marketing.pro.fsc"
        type="marketing"
        language="de"
      >
        Open Marketing info
      </TSXContentScreenTrigger>
    </div>
    <TSXContentScreen />
  </div>
</template>

<script lang="ts" setup>
import TSXContentScreenTrigger from './components/feature/TSXContentScreenTrigger/TSXContentScreenTrigger.ce.vue'
import TSXContentScreen from './components/feature/TSXContentScreen/TSXContentScreen.ce.vue'
</script>
