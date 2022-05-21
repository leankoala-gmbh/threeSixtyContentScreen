# 360 Advisor
A WebComponent for displaying info texts from an api.

## Install
As NPM Module
```bash
npm i @webpros/360-advisor
```

Or as vanilla JS script via the unpkg cdn
```html
<script type="module" crossorigin src="https://unpkg.com/@webpros/360-advisor@1.0.3/dist/360advisor.js"></script>
```

## Usage
The Advisor provides two elements that must be inserted into the document. The `<advisor-element>` should be placed in the footer area to display the API information.

The `<advisor-trigger guide-id="GUIDEID" language="LANG">` element is the trigger element that can be wrapped around buttons or text elements. Important here is that this inner button element has no real function, it should only look good ;) Depending on `guide-id`, when you click on the element, the corresponding content is retrieved via the API and displayed in the `advisor-element`.

The language of the advisor can be selected via the `language` parameter, by default it is set to English.

### Example
```html
<body>
...
<main>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aut, blanditiis consequuntur delectus excepturi facere ipsa maiores molestiae natus obcaecati recusandae reprehenderit rerum sed sint soluta vero voluptatem voluptatibus voluptatum.</p>
  <advisor-trigger guide-id="_demo.md.elements">
    <button>Click me to see the guide</button>
  </advisor-trigger>
  ...
</main>
<advisor-element></advisor-element>
</body>
```

## Usage with Frontend Frameworks

### Vue / Nuxt 
So that Vue does not treat these elements as regular Vue components the tags must be ignored. The easiest way is to include the elements using `plugin`.

```js
import Vue from 'vue'
import '@webpros/360-advisor'

Vue.config.ignoredElements = [
  'advisor-trigger',
  'advisor-element'
]
```

### Alternative zum Trigger Element
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
:root{
  --primaryColorRegular: #52bce5;
  --primaryColor400: #68caef;
  --primaryColor500: #3397be}
```
