<template>
  <div class="page-root">
    <slot />
  </div>
</template>

<style scoped>
.page-root {
  background: var(--bg);
  color: var(--fg-1);
  min-height: 100vh;
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}
</style>
