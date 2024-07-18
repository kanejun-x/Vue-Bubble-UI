# Vue-Bubble-UI 🔮

A highly configurable Bubble UI Vue.js component, similar to the iconic Apple Watch app layout.

Originally known as [React-Bubble-UI](https://github.com/blakesanie/React-Bubble-UI), this package is re-created for Vue.js.

[![NPM](https://img.shields.io/npm/v/vue-bubble-ui.svg)](https://www.npmjs.com/package/vue-bubble-ui)
[![GitHub](https://img.shields.io/badge/GitHub-kanejun_x-brightgreen.svg?logo=github)](https://github.com/kanejun-x/Vue-Bubble-UI)

<img src="https://github.com/blakesanie/React-Bubble-UI/raw/main/example/public/demo.gif" style="border-radius: 30px"/>

## Install

Using npm:

```bash
npm add vue-bubble-ui
```

Using yarn:

```bash
yarn add vue-bubble-ui
```

## Interactive Demo

Interact with a live demo to configure to UI to your liking.

[**Experience Demo**](https://blakesanie.github.io/React-Bubble-UI/#/demo)

## Thorough Documentation

Understand how to apply the component's high confirgurability to your design.

[**Read Docs**](https://blakesanie.github.io/React-Bubble-UI/#/docs)

## How to use for Vue.js

```vue
<script setup lang="ts">
import { BubbleUi, type BubbleUiProps } from 'vue-bubble-ui'
// write your code
</script>

<template>
  <div :style="{ width: '100vw', height: '100vh' }">
    <bubble-ui :items="data" :options="options">
      <template #item="{ item, bubble }"> write your bubble code here </template>
    </bubble-ui>
  </div>
</template>
```

Please see `src/App.vue` for the detail.

Each element in the `items` of props can be access from `item`.
You can also get the position and size of each element from `bubble` with the type below.

```ts
{
  bubbleSize: number
  translateX: number
  translateY: number
  distance: number
}
```

## Contributing

I highly encourage you to help improve this package further through the following steps:

1. Clone this repository
2. Branch off for the new feature
3. Contribute the feature (write the code)
4. Push to your (personal) origin repository
5. Create a Pull Request

This package assumes you are using [Conventional Commit messages](https://www.conventionalcommits.org/en/v1.0.0/).

## Author

This package was re-created for Vue.js by [Jun Kaneda](https://github.com/kanejun-x) in 2024.

Original React package was created by [Blake Sanie](https://github.com/blakesanie) in 2020.

Like what you see? [View his other projects 📱 ](https://blakesanie.com/cs), [read his blog 💻 ](https://blakesanie.medium.com), or [buy him a coffee ☕](https://paypal.me/blakesanie?locale.x=en_US).

## License

MIT © [blakesanie](https://github.com/blakesanie)
