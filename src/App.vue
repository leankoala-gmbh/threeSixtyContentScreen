<template>
  <div>
    <AdvisorTrigger guide-id="blubb">
      open trigger
    </AdvisorTrigger>
    <AdvisorTrigger>broken trigger</AdvisorTrigger>
    <Advisor />
  </div>
</template>

<script>
import Advisor from '@/components/feature/Advisor/Advisor.ce.vue'
import AdvisorTrigger from '@/components/feature/AdvisorTrigger/AdvisorTrigger.ce.vue'

export default {
  components: {AdvisorTrigger, Advisor }
}
</script>
