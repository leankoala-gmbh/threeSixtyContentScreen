<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import TSXContentScreenTrigger from './components/feature/TSXContentScreenTrigger/TSXContentScreenTrigger.ce.vue'
import TSXContentScreen from './components/feature/TSXContentScreen/TSXContentScreen.ce.vue'

const changelogEndpoints = JSON.stringify({
  getChangelogs: 'https://stage.monitoring360.io/changelog/last',
  postChangelog: 'https://stage.monitoring360.io/changelog/read/'
})
</script>


<template>
  <div>
    <div class="mb-10">
      <TSXContentScreenTrigger
        content-id="html.deadlink.404"
        title="Advisor"
      >
        Open Advisor
      </TSXContentScreenTrigger>
    </div>
    <div class="mb-10">
      <TSXContentScreenTrigger
        content-id="monitoring.content.content"
        type="koality"
        language="en"
      >
        Open kAdvisor info
      </TSXContentScreenTrigger>
    </div>
    <div>
      <TSXContentScreenTrigger
        content-url="https://www.google.com"
        type="content"
        language="de"
        title="Content noch mal"
        brand-type="advisor"
      >
        Open content info
      </TSXContentScreenTrigger>
    </div>
    <div>
      <TSXContentScreenTrigger
        content-id="_demo.iframe.test"
        type="marketing"
        language="de"
        iframe-button-label="Open in iframe"
        iframe-url="https://www.google.com"
      >
        Open Iframe Content
      </TSXContentScreenTrigger>
    </div>

    <div>
      <TSXContentScreenTrigger
        type="changelog"
        changelog-url="https://www.koality.com/api/v1/changelog"
        :changelog-endpoints="changelogEndpoints"
      >
        Open Changelog
      </TSXContentScreenTrigger>
    </div>
    <TSXContentScreen :debug="true" />
  </div>
</template>

