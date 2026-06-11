<template>
  <span
    class="dmark"
    :style="{
      width: size + 'px',
      height: size + 'px',
      borderRadius: radius + 'px',
      fontSize: fontSize + 'px',
    }"
    aria-hidden="true"
    >D</span
  >
</template>

<script setup lang="ts">
// The "D" placeholder wordmark from the design system (no logo yet).
withDefaults(
  defineProps<{
    size?: number
    radius?: number
    fontSize?: number
  }>(),
  { size: 24, radius: 5, fontSize: 13 },
)
</script>

<style scoped>
.dmark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--ink);
  color: var(--bg);
  font-family: var(--font-sans);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
  flex-shrink: 0;
}
</style>
