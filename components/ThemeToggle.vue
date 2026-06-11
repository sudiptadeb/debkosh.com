<template>
  <div class="seg" role="group" aria-label="Color theme">
    <button
      v-for="mode in modes"
      :key="mode"
      type="button"
      class="seg-btn"
      :class="{ active: current === mode }"
      :aria-pressed="current === mode"
      @click="set(mode)"
    >
      {{ mode }}
    </button>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const modes = ['light', 'dark'] as const

// `preference` is what the user picked; `value` resolves system → concrete.
const current = computed(() => (colorMode.preference === 'dark' ? 'dark' : 'light'))

function set(mode: (typeof modes)[number]) {
  colorMode.preference = mode
}
</script>

<style scoped>
.seg {
  display: inline-flex;
  padding: 2px;
  background: var(--surface-2);
  border-radius: 999px;
  border: 1px solid var(--border);
}

.seg-btn {
  border: 0;
  cursor: pointer;
  font: 500 12px/1 var(--font-sans);
  padding: 6px 13px;
  border-radius: 999px;
  text-transform: capitalize;
  background: transparent;
  color: var(--fg-2);
  transition: all var(--dur-fast) var(--ease-out);
}

.seg-btn.active {
  background: var(--bg);
  color: var(--ink);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
</style>
