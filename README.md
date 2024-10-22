<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: Nuxt State Monitor
- Package name: nuxt-state-monitor
- Description: Real-time monitoring of Nuxt native states
-->

![Laravel42](./cover.webp)

# Nuxt State Monitor

![Nuxt State Monitor](https://img.shields.io/badge/Nuxt-3.x-brightgreen.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Version](https://img.shields.io/badge/Version-1.0.8-blue.svg)
![Downloads](https://img.shields.io/npm/dt/nuxt-state-monitor.svg)

**Nuxt State Monitor** is a lightweight Nuxt module that allows you to monitor and edit all variables stored in Nuxt's native state, including custom data of any type. This is useful for debugging, managing state, and keeping track of custom runtime data in a seamless and developer-friendly way.

## Features

- 📊 **State Monitoring**: Real-time monitoring of all Nuxt native states.
- 🔧 **State Editing**: Dynamically edit the state directly from the UI.
- 🔍 **Custom Data Monitoring**: Watch and manage custom data objects and variables.
- 📂 **State Import/Export**: Effortlessly import and export state data for debugging or sharing.
- ⚡  **Zero Configuration**: Minimal setup and configuration needed.
- 💻 **Developer-Friendly UI**: A sleek and intuitive UI to track and manage states.

## Installation

``` 
npx nuxi@latest module add nuxt-state-monitor
```

Update your ```nuxt.config```:

  ```
  export default defineNuxtConfig({
    modules: [
      'nuxt-state-monitor'
    ]
  })
  ```

## Usage

Add the component in App.vue to enable monitor globally, or in single pages if you want to keep track of custom data (optional).

```<NuxtStateMonitor custom-data="additional"/>```

## Support the Project 💚

If you find this project useful and would like to support its development, you can donate through [GitHub Sponsors](https://github.com/sponsors/Laravel42)

Every contribution, no matter how small, helps keep the project running!

## Contacts

✉️ Mail: hello@laravel42.com &nbsp; 🌐 Web: https://laravel42.com
