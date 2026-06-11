<template>
  <div class="toggle-root">
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
    <!-- Single-icon toggle for small screens, where the pill is too wide. -->
    <button
      type="button"
      class="icon-btn"
      :aria-label="current === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
      @click="set(current === 'dark' ? 'light' : 'dark')"
    >
      <Icon :name="current === 'dark' ? 'sun' : 'moon'" :size="15" />
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
.toggle-root {
  display: inline-flex;
  align-items: center;
}

.seg {
  display: inline-flex;
  padding: 2px;
  background: var(--surface-2);
  border-radius: 999px;
  border: 1px solid var(--border);
}

.icon-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface-1);
  color: var(--fg-2);
  cursor: pointer;
  transition:
    background var(--dur-fast) var(--ease-out),
    color var(--dur-fast) var(--ease-out);
}

.icon-btn:hover {
  background: var(--surface-2);
  color: var(--fg-1);
}

@media (max-width: 640px) {
  .seg {
    display: none;
  }

  .icon-btn {
    display: inline-flex;
  }
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
