# 360 Content Screen
A WebComponent for displaying info texts from an api.

## Install
As NPM Module
```bash
npm i @webpros/three-sixty-contentscreen
```

## Usage
The Content Screen provides two elements that must be inserted into the document. The `<tsx-contentscreen>` should be placed in the footer area to display the API information.

The `<tsx-contentscreen-trigger content-id="GUIDEID" language="LANG">` element is the trigger element that can be wrapped around buttons or text elements. Important here is that this inner button element has no real function, it should only look good ;) Depending on `guide-id`, when you click on the element, the corresponding content is retrieved via the API and displayed in the `tsx-contentscreen`.

The language of the content can be selected via the `language` parameter, by default it is set to English.

### Example
```html
<body>
...
<main>
  <tsx-contentscreen-trigger
    content-id="_demo.md.elements"
    type="marketing"
  >
    Open Marketing info
  </tsx-contentscreen-trigger>
  ...
</main>
<tsx-contentscreen />
</body>
```

## Usage with Frontend Frameworks

### Vue / Nuxt 
So that Vue does not treat these elements as regular Vue components the tags must be ignored. The easiest way is to include the elements using `plugin`.

```js
import Vue from 'vue'
import '@webpros/three-sixty-contentscreen'

Vue.config.ignoredElements = [
  'tsx-contentscreen',
  'tsx-contentscreen-trigger'
]
```

### Alternative to the trigger element
If you don't want to use the trigger element, you can also send an event directly to the `window.mitt` object with the following payload.

```ts
interface MittPayload {
  contentId: string
  language?: string
  type?: 'advisor' | 'marketing' | 'content'
}
```

```js
window.mitt.emit('tsxContentScreenConfig', {
    contentId: 'test',
  })
```

### React / Next
Currently no findings.

## Colors
The component's colors are declared via CSSVars and can thus be adjusted externally.

It is therefore necessary to declare the following CSS variables:

```css
:root {
  --tsxScreenPrimary: #52bce5;
  --tsxScreenPrimaryHover: #68caef;
  --tsxScreenMarketing: #E77B35;
  --tsxScreenMarketingHover: #e16b1f;
  --tsxScreenBackground: #ffffff;
  --tsxScreenText: #374253;
  --tsxScreenHeadline: #111729;
}
