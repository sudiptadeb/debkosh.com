<template>
  <footer class="ftr" :style="{ marginTop: marginTop + 'px' }">
    <div class="ftr-inner" :style="{ maxWidth: maxWidth + 'px' }">
      <div class="ftr-brand">
        <DMark :size="22" :font-size="12" />
        <span class="ftr-label">Sudipta Deb · {{ label }}</span>
      </div>
      <div class="ftr-links">
        <slot />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    maxWidth?: number
    label?: string
    marginTop?: number
  }>(),
  { maxWidth: 1080, label: 'debkosh.com', marginTop: 96 },
)
</script>

<style scoped>
.ftr {
  border-top: 1px solid var(--border);
  padding: 24px 0 36px;
}

.ftr-inner {
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}

.ftr-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.ftr-label {
  font: 500 12px/1 var(--font-mono);
  color: var(--fg-3);
  letter-spacing: 0.02em;
}

.ftr-links {
  display: flex;
  gap: 18px;
  align-items: center;
}

.ftr-links :deep(a) {
  color: var(--fg-3);
  font: 500 12px/1 var(--font-mono);
  text-decoration: none;
  transition: color var(--dur-fast) var(--ease-out);
}

.ftr-links :deep(a:hover) {
  color: var(--accent);
}

@media (max-width: 640px) {
  .ftr-inner {
    padding: 0 20px;
  }
}
</style>
