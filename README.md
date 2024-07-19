# Vue-Bubble-UI 🔮

[![Version](https://img.shields.io/npm/v/vue-bubble-ui.svg)](https://www.npmjs.com/package/vue-bubble-ui)
![Prerequisite](https://img.shields.io/badge/node-%3E%3D18-blue.svg)
[![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://github.com/kanejun-x/Vue-Bubble-UI#readme)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/kanejun-x/Vue-Bubble-UI/graphs/commit-activity)
[![License: MIT](https://img.shields.io/github/license/kanejun-x/vue-bubble-ui)](https://github.com/kanejun-x/Vue-Bubble-UI/blob/master/LICENSE)
[![Twitter: kanejun-x](https://img.shields.io/twitter/follow/kanejun-x.svg?style=social)](https://twitter.com/kanejun-x)

A highly configurable Bubble UI Vue.js component, similar to the iconic Apple Watch app layout.

Originally known as [React-Bubble-UI](https://github.com/blakesanie/React-Bubble-UI), this package is re-created for Vue.js.

<img src="https://github.com/blakesanie/React-Bubble-UI/raw/main/example/public/demo.gif" style="border-radius: 30px"/>

## Prerequisites

- node >=18

## Install

Using npm:

```sh
npm i vue-bubble-ui
```

Using yarn:

```sh
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
The position and size of each element can be got from `bubble` with the type below.

```ts
{
  bubbleSize: number
  translateX: number
  translateY: number
  distance: number
}
```

## Author

This package was re-created for Vue.js by [Junichi Kaneda](https://github.com/kanejun-x) in 2024.

- Twitter: [@kanejun-x](https://twitter.com/kanejun-x)
- Github: [@kanejun-x](https://github.com/kanejun-x)

Original React package was created by [Blake Sanie](https://github.com/blakesanie) in 2020.

- Like what you see? [View his other projects 📱 ](https://blakesanie.com/cs), [read his blog 💻 ](https://blakesanie.medium.com), or [buy him a coffee ☕](https://paypal.me/blakesanie?locale.x=en_US).

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/kanejun-x/Vue-Bubble-UI/issues).

I highly encourage you to help improve this package further through the following steps:

1. Clone this repository
2. Branch off for the new feature
3. Contribute the feature (write the code)
4. Push to origin repository
5. Create a Pull Request

This package assumes you are using [Conventional Commit messages](https://www.conventionalcommits.org/en/v1.0.0/).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

MIT © [blakesanie](https://github.com/blakesanie)

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
